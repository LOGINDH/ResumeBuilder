import React from 'react';
import {StyleSheet, View} from 'react-native';

import {AppText} from '../common';
import {Theme} from '../../theme';

interface Props{
  number:string;
  title:string;
}

const StatsCard=({number,title}:Props)=>{
  return(
    <View style={styles.card}>

      <AppText
        variant="h2"
        weight="700">
        {number}
      </AppText>

      <AppText
        variant="small"
        color={Theme.colors.textSecondary}>
        {title}
      </AppText>

    </View>
  )
}

export default StatsCard;

const styles=StyleSheet.create({

card:{
flex:1,
backgroundColor:Theme.colors.surface,
padding:Theme.spacing.lg,
borderRadius:Theme.radius.lg,
alignItems:'center',
marginHorizontal:5,
...Theme.shadows.small
}

})