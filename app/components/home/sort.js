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
import Modal from 'react-native-modal'

const Sort = (props) => {
    return (
        <Modal 
            isVisible={props.showSortOptions}
            style={styles.modalContainer}>
                <View style={styles.container}>
                    {props.sorts.map(data => {
                        return (
                            <TouchableOpacity 
                                activeOpacity={1}
                                onPress={()=> props.sortOptionPressed(data.key, data.order)}
                                style={styles.sortOptionView}>
                                <Text style={styles.sortOption}>{data.text}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    <TouchableOpacity 
                        activeOpacity={1}
                        onPress={()=> props.sortCancelPressed()}
                        style={styles.closeView}>
                        <Text style={styles.sortOption}>{strings.close}</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
    )
} 

const styles = StyleSheet.create({
    modalContainer: {
        margin: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    container: {
        width: wp("100%"),
        alignSelf: 'flex-end',
        backgroundColor: colors.primary,
        flexDirection: 'column'
    },
    sortOptionView: {
        width: wp('100%'),
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.secondary
    },
    sortOption: {
        fontSize: wp('4%'),
        color: colors.black,
    },
    closeView: {
        width: wp('100%'),
        height: hp('7%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightLightGrey
    }
})

export default Sort