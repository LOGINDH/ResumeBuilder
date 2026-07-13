package com.myapp

import android.content.ContentValues
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class FileModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "FileModule"
    }

    @ReactMethod
    fun downloadPdf(filePath: String, fileName: String, promise: Promise) {
        try {
            val sourceFile = File(filePath)
            if (!sourceFile.exists()) {
                promise.reject("FILE_NOT_FOUND", "Source PDF file does not exist.")
                return
            }

            val finalFileName = if (fileName.endsWith(".pdf")) fileName else "$fileName.pdf"

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val resolver = reactContext.contentResolver
                val contentValues = ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, finalFileName)
                    put(MediaStore.MediaColumns.MIME_TYPE, "application/pdf")
                    put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
                }

                val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, contentValues)
                if (uri == null) {
                    promise.reject("WRITE_ERROR", "Could not create MediaStore entry for download.")
                    return
                }

                resolver.openOutputStream(uri).use { outputStream ->
                    if (outputStream == null) {
                        promise.reject("WRITE_ERROR", "Could not open output stream for download.")
                        return
                    }
                    FileInputStream(sourceFile).use { inputStream ->
                        inputStream.copyTo(outputStream)
                    }
                }

                promise.resolve(uri.toString())
            } else {
                val downloadDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
                if (!downloadDir.exists() && !downloadDir.mkdirs()) {
                    promise.reject("FOLDER_ERROR", "Could not create Downloads directory.")
                    return
                }

                val destinationFile = File(downloadDir, finalFileName)
                FileInputStream(sourceFile).use { inputStream ->
                    FileOutputStream(destinationFile).use { outputStream ->
                        inputStream.copyTo(outputStream)
                    }
                }

                promise.resolve(destinationFile.absolutePath)
            }
        } catch (e: Exception) {
            promise.reject("ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun sharePdf(filePath: String, title: String, promise: Promise) {
        try {
            val file = File(filePath)
            if (!file.exists()) {
                promise.reject("FILE_NOT_FOUND", "Source PDF file does not exist.")
                return
            }

            val authority = "${reactContext.packageName}.fileprovider"
            val fileUri: Uri = FileProvider.getUriForFile(reactContext, authority, file)

            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "application/pdf"
                putExtra(Intent.EXTRA_STREAM, fileUri)
                putExtra(Intent.EXTRA_SUBJECT, title)
                putExtra(Intent.EXTRA_TEXT, "Here is the resume PDF of $title.")
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
            }

            val chooser = Intent.createChooser(shareIntent, "Share Resume PDF").apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            }

            reactContext.startActivity(chooser)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("SHARE_ERROR", e.message, e)
        }
    }
}
