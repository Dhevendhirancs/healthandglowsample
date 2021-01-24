import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native'
import * as constants from '../../../utils/constants.js'
import * as strings from '../../../utils/strings.js'
import * as colors from '../../../utils/colors.js'
import * as dimens from '../../../utils/dimens.js'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const Filter = (props) => {
    return (
        <View> 
            <View style={styles.filterHeaderContainer}>
                <View style={styles.filterHeader}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=> props.closeFilterPressed()}
                        style={styles.closeFilterView}>
                        <Image 
                            style={styles.closeFilter}
                            source={require('../../assets/images/close.jpg')}/>
                    </TouchableOpacity> 
                    <View style={styles.filterTitleView}>
                        <Text style={styles.filterTitle}>{strings.filterBy}</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=> props.clearAllPressed()}
                        style={styles.clearAllView}>
                            <Text style={styles.clearAll}>{strings.clearAll}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.aggregationsContainer}>
                    <FlatList 
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={props.aggregations}
                        renderItem={(item, index)=> renderAggregations(item.item, item.index)}/>
                </View>
                <View style={styles.bucketsContainer}>
                    {props.aggregations.length != 0 && <FlatList 
                            key={props.bucketListUpdateKey}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={props.aggregations[props.selectedAggregationIndex].buckets}
                            renderItem={(item, index)=> renderBuckets(item.item, item.index)}/>}
                </View>
            </View>
            <TouchableOpacity 
                activeOpacity={1}
                onPress={()=> props.applyPressed()}
                style={styles.applyButtonView}>
                <Text style={styles.applyButton}>{strings.apply}</Text>
            </TouchableOpacity>
        </View>
    )
    function renderBuckets(item, index) {
        return (
            <TouchableOpacity 
                activeOpacity={1}
                onPress={()=> props.bucketPressed(index)}
                style={styles.bucketContainer}>
                <Text 
                    numberOfLines={1}
                    style={styles.bucket}>{item.text} <Text style={styles.bucketCount}>({item.docCount})</Text></Text>
                <Image 
                    source={item.isSelected 
                        ? require('../../assets/images/tickSelected.jpg')
                        : require('../../assets/images/tickUnselected.jpg')}
                    style={styles.bucketSelectImage}/>
            </TouchableOpacity>
        )
    }
    function renderAggregations(item, index) {
        return (
            <TouchableOpacity 
                activeOpacity={1}
                onPress={()=> props.aggregationPressed(index)}
                style={props.selectedAggregationIndex == index 
                    ? styles.selectedAggregationView
                    : styles.aggregationView}>
                <Text style={styles.aggregation}>{item.text}</Text>
            </TouchableOpacity>
        )
    }
} 

const headerHeight = hp('8%')
const contentContainerHeight = hp('84%')
const applyButtonContainer = hp('8%')

const styles = StyleSheet.create({
    filterHeaderContainer: {
        overflow: 'hidden',
        paddingBottom: hp('0.5%')
    },
    filterHeader: {
        width: wp('100%'), 
        height: headerHeight,
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
    closeFilterView: {
        width: wp('20%'),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: wp('5%')
    },
    closeFilter: {
        width: wp('5%'),
        height: wp('5%')
    },
    filterTitleView: {
        width: wp('60%'),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterTitle: {
        fontSize: wp('5%'),
        color: colors.black
    },
    clearAllView: {
        width: wp('20%'),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearAll: {
        fontSize: wp('4%'),
        color: colors.secondary
    },
    contentContainer: {
        width: wp('100%'),
        height: contentContainerHeight,
        flexDirection: 'row',
    },
    aggregationsContainer: {
        width: wp('30%'),
        height: '100%',
        borderRightWidth: wp('0.2%'),
        borderRightColor: colors.lightGrey
    },
    bucketsContainer: {
        width: wp('70%'),
        height: '100%'
    },
    aggregationView: {
        width: '100%',
        height: hp('6.5%'),
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: wp('3%'),
        backgroundColor: colors.primary
    },
    selectedAggregationView: {
        width: '100%',
        height: hp('6.5%'),
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: wp('3%'),
        backgroundColor: colors.lightLightGrey
    },
    aggregation: {
        fontSize: wp('5%'),
        color: colors.black
    },
    bucketContainer: {
        width: '100%',
        height: hp('6%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('3%'),
    },
    bucket: {
        fontSize: wp('4.5%'),
        color: colors.black,
    },
    bucketCount: {
        fontSize: wp('4.5%'),
        color: colors.darkGrey
    },
    bucketSelectImage: {
        width: wp('5.5%'),
        height: wp('5.5%')
    },
    applyButtonView: {
        width: wp('100%'),
        height: applyButtonContainer,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    applyButton: {
        fontSize: wp('4%'),
        color: colors.primary
    }
})

export default Filter