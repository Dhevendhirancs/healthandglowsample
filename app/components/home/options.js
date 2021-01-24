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

const Options = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                activeOpacity={1}
                onPress={()=> props.viewTypePressed()}
                style={styles.viewTypeBox}>
                <Image 
                    source={require('../../assets/images/viewType.jpg')}
                    resizeMode='contain'
                    style={styles.viewType} />
            </TouchableOpacity>
            <TouchableOpacity 
                activeOpacity={1}
                onPress={()=> props.sortPressed()}
                style={styles.sortBox}>
                <Text style={styles.sort}>{strings.sort}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                activeOpacity={1}
                onPress={()=> props.filterPressed()}
                style={styles.sortBox}>
                <Text style={styles.sort}>{strings.filter}</Text>
            </TouchableOpacity>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: dimens.optionsHeight,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: colors.silver,
        borderBottomWidth: wp('0.3%')
    },
    viewTypeBox: {
        width: wp('12%'),
        height: '70%',
        borderWidth: wp('0.3%'),
        borderColor: colors.silver,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewType: {
        width: '5%'
    },  
    sortBox: {
        width: wp('30%'),
        height: '65%',
        borderWidth: wp('0.3%'),
        borderColor: colors.silver,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp('2%')
    },
    viewType: {
        width: wp('5%'),
        height: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sort: {
        fontSize: wp('4.5%'),
        color: colors.darkGrey
    }
})

export default Options