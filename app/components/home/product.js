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

const Product = (props) => {
    return (
            <View style={styles.container}>
                <View style={styles.offerContainer}>
                    <View style={styles.offerView}>
                        <Text style={styles.offer}>40% OFF</Text>
                    </View>
                    <View style={styles.likeView}>
                        <Image 
                            source={require('../../assets/images/like.jpg')}
                            resizeMode='contain'
                            style={styles.like} />
                    </View>
                </View>
                <View style={styles.productImage}>
                    <Image 
                        style={styles.image}
                        source={{ uri: props.item.skuImageUrl }}
                        resizeMode='contain'/>
                </View>
                <View style={styles.titleView}>
                    <Text
                        style={styles.title}
                        numberOfLines={3}>
                            {props.item.skuName}
                        </Text>
                </View>
                <View style={styles.priceView}>
                    <Text style={styles.price}>&#8377; {props.item.listPrice} </Text>
                    <Text style={styles.defaultPrice}>&#8377; {props.item.defaultPrice} </Text>
                </View>
                <View style={styles.divider}>

                </View>
            </View>
    )
} 

const offerContainerHeight = '13%'
const productImageHeight = '52%'
const titleViewHeight = '23%'
const priceViewHeight = '12%'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp('35%'),
        maxHeight: hp('35%'),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.5%'),
    },
    offerContainer: {
        width: '100%',
        height: offerContainerHeight,
        maxHeight: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.primary
    },
    offerView: {
        width: wp('18%'),
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkRed
    },
    offer: {
        fontSize: wp('3.5%'),
        color: colors.primary
    },
    likeView: {
        width: wp('8%'),
        height: wp('8%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    like: {
        width: '75%',
        height: '75%'
    },
    productImage: {
        width: '100%',
        height: productImageHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    image: {
        width: '80%',
        height: '80%'
    },
    titleView: {
        width: '100%',
        height: titleViewHeight,
        justifyContent: 'center',
        paddingBottom: '1%'
    },
    title: {
        fontSize: wp('4%'),
        color: colors.black,
        alignSelf: 'flex-start'
    },
    priceView: {
        width: '100%',
        height: priceViewHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    price: {
        fontSize: wp('4%'),
        color: colors.darkRed,
        marginRight: wp('2%')
    },
    defaultPrice: {
        fontSize: wp('4%'),
        color: colors.darkGrey,
        marginRight: wp('2%'),
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid',
        textDecorationColor: colors.darkGrey
    },
    divider: {
        width: '90%',
        height: wp('0.2%'),
        backgroundColor: colors.lightGrey,
        alignSelf: 'center'
    }
})

export default Product