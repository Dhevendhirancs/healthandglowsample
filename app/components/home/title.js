import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import * as constants from '../../../utils/constants.js'
import * as strings from '../../../utils/strings.js'
import * as colors from '../../../utils/colors.js'
import * as dimens from '../../../utils/dimens.js'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const Title = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.count}> - {props.productsCount} {strings.products}</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: dimens.titleHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        flexDirection: 'row'
    },
    title: {
        fontSize: wp('4.5%'),
        color: colors.black,
    },
    count: {
        fontSize: wp('4.5%'),
        color: colors.silver
    }
})

export default Title