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

const CustomHeader = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.firstHalf}>
                <Image 
                    source={require('../../assets/images/menu.jpg')}
                    resizeMode='contain'
                    style={styles.menu}/>
                <Image 
                    source={require('../../assets/images/title.jpg')}
                    resizeMode='contain'
                    style={styles.title}/>
            </View>
            <View style={styles.secondHalf}>
            <Image 
                    source={require('../../assets/images/favourite.jpg')}
                    resizeMode='contain'
                    style={styles.rightIcon}/>
                    <Image 
                    source={require('../../assets/images/search.jpg')}
                    resizeMode='contain'
                    style={styles.rightIcon}/>
                    <Image 
                    source={require('../../assets/images/filter.jpg')}
                    resizeMode='contain'
                    style={styles.rightIcon}/>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: dimens.headerHeight,
        backgroundColor: colors.primary,
        paddingHorizontal: wp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    firstHalf: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    menu: {
        width: wp('8%'),
        height: wp('8%'),
        marginHorizontal: wp('2%')
    },
    title: {
        width: wp('45%'),
        marginTop: wp('2%')
    },
    secondHalf: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightIcon: {
        width: wp('6%'),
        height: wp('6%'),
        marginHorizontal: wp('2%')
    }
})

export default CustomHeader