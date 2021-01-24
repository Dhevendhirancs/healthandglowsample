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

const Location = (props) => {
    const zipCode = '560097'
    return (
        <View style={styles.shadowContainer}>
<View style={styles.container}>
            <Image 
                source={require('../../assets/images/location.jpg')}
                resizeMode='contain'
                style={styles.location}/>
            <Text style={styles.deliverTo}>{strings.deliverTo} - {zipCode}</Text>
            <Image 
                source={require('../../assets/images/dropDown.jpg')}
                resizeMode='contain'
                style={styles.dropDown} />
        </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    shadowContainer: {
        overflow: 'hidden',
        paddingBottom: hp('0.5%')
    },
    container: {
        width: wp('100%'),
        height: dimens.locationHeight,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '0%',
        paddingRight: '0%',
        paddingLeft: '0%',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0.1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    location: {
        width: wp('7%'),
        height: wp('7%'),
        marginHorizontal: wp('2%')        
    },
    deliverTo: {
        fontSize: wp('4.5%'),
        color: colors.black
    },
    dropDown: {
        width: wp('4%'),
        height: wp('4%'),
        marginHorizontal: wp('0.5%')
    }
})

export default Location