import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native'
import * as constants from '../../../utils/constants.js'
import * as strings from '../../../utils/strings.js'
import * as colors from '../../../utils/colors.js'
import * as dimens from '../../../utils/dimens.js'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import CustomHeader from './customHeader'
import Title from './title'
import Options from './options'
import Location from './location'
import Product from './product'
import Filter from './filter'
import Sort from './sort'
import Modal from 'react-native-modal'

const Home = (props) => {
    const chunkSize = 20
    const [lastItemIndex, setLastItemIndex] = useState(0)
    const baseUrl = 'https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris'// &page=0:20'
    const [totalCount, setTotalCount] = useState(0)
    const [title, setTitle] = useState('')
    const [products, setProducts] = useState([])
    const [aggregations, setAggregations] = useState([])
    const [sorts, setSorts] = useState([])
    const [loader, setLoader] = useState(false)
    const [selectedAggregationIndex, setSelectedAggregationIndex] = useState(0)
    const [showFilter, setShowFilter] = useState(false)
    const [showSortOptions, setShowSortOptions] = useState(false)
    const [sortKey, setSortKey] = useState(null)
    const [sortOrder, setSortOrder] = useState(null)
    const [numberOfColumns, setNumberOfColumns] = useState(2)
    const [bucketListUpdateKey, changeBucketListUpdateKey] = useState('_')
    const [isProductsError, setProductsError] = useState(false)
    useEffect(()=> {
        setProductsError(false)
        fetchProducts(false, false, sortKey, sortOrder)
    }, [])
    return (
        <View style={styles.container}>
            {!showFilter 
            ? <>
                <CustomHeader />
                <Title 
                    title={title}
                    productsCount={totalCount}/>
                <Options 
                    filterPressed={()=> setShowFilter(true)} 
                    sortPressed={()=> sortPressed()} 
                    viewTypePressed={()=> viewTypePressed()} />
                <Location />
                {!isProductsError 
                    ? renderProducts()
                    : renderErrorPage()}
            </>
            : <Filter 
                aggregations={aggregations}
                selectedAggregationIndex={selectedAggregationIndex}
                aggregationPressed={(selectedAggregationIndex)=> aggregationPressed(selectedAggregationIndex)}
                bucketPressed={(selectedBucketIndex)=> bucketPressed(selectedBucketIndex)} 
                applyPressed={()=> applyPressed()}
                clearAllPressed={()=> clearAllPressed()}
                closeFilterPressed={()=> setShowFilter(false)} 
                bucketListUpdateKey={bucketListUpdateKey}/>}
        </View>
    )
    function renderErrorPage() {
        return (
            <View style={styles.productsErrorContainer}>
                <Text style={styles.productsError}>{strings.somethingWentWrong}</Text>
            </View>
        )
    }
    function viewTypePressed() {
        if (numberOfColumns == 2) {
            setNumberOfColumns(1)
        } else (
            setNumberOfColumns(2)
        )
    }
    function sortPressed() {
        setShowSortOptions(true)
    }
    function clearAllPressed() {
        let _aggregations = aggregations
        for (let i = 0; i < _aggregations.length; i++) {
            for (let j = 0; j < aggregations[i].buckets.length; j++) {
                aggregations[i].buckets[j].isSelected = false
            }
        }
        setAggregations(_aggregations)
        if (bucketListUpdateKey == '_') {
            changeBucketListUpdateKey('#')
        } else {
            changeBucketListUpdateKey('_')
        }
    }
    function applyPressed() {
        setShowFilter(false)
        setLoader(true)
        setLastItemIndex(0)
        fetchProducts(true, false, sortKey, sortOrder)
    }
    function aggregationPressed(selectedAggregationIndex) {
        setSelectedAggregationIndex(selectedAggregationIndex)
    }
    function bucketPressed(selectedBucketIndex) {
        let _aggregations = aggregations
        var bucketAddPermissionFlag = true
        if (!_aggregations[selectedAggregationIndex].isForMultiSelection && !_aggregations[selectedAggregationIndex].buckets[selectedBucketIndex].isSelected) {
            for (let j = 0; j < _aggregations[selectedAggregationIndex].buckets.length; j++) {
                if (_aggregations[selectedAggregationIndex].buckets[j].isSelected) {
                    bucketAddPermissionFlag = false
                    break
                }
            }
        }
        if (bucketAddPermissionFlag) {
            _aggregations[selectedAggregationIndex].buckets[selectedBucketIndex].isSelected = !_aggregations[selectedAggregationIndex].buckets[selectedBucketIndex].isSelected
            setAggregations(_aggregations)
        }
        if (bucketListUpdateKey == '_') {
            changeBucketListUpdateKey('#')
        } else {
            changeBucketListUpdateKey('_')
        }
    }
    function renderProducts() {
        return (
            <View style={styles.productsContainer}>
                {numberOfColumns == 1 
                    ? <FlatList
                    key={'_'} 
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={products}
                    renderItem={(item, index)=> renderItem(item.item, item.index)} 
                    numColumns={1} 
                    onEndReachedThreshold={0.4}
                    onEndReached={()=> handleLoadMore()}/>
                : <FlatList
                    key={'#'} 
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={products}
                    renderItem={(item, index)=> renderItem(item.item, item.index)} 
                    numColumns={2} 
                    onEndReachedThreshold={0.4}
                    onEndReached={()=> handleLoadMore()}/>}
                <Sort 
                    showSortOptions={showSortOptions}
                    sorts={sorts}
                    sortOptionPressed={(key, order) => sortOptionPressed(key, order)}
                    sortCancelPressed={()=> setShowSortOptions(false)} />
                {loader && <View style={styles.loaderView}>
                    <ActivityIndicator color={colors.secondary} size='large' />
                </View>}
        </View>
        )
    }
    function sortOptionPressed(key, order) {
        setShowSortOptions(false)
        setLoader(true)
        setSortKey(key)
        setSortOrder(order)
        setLastItemIndex(0)
        fetchProducts(false, true, key, order)
    }
    function renderItem(item, index) {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Product 
                    item={item}
                    index={index}/>
                {numberOfColumns == 2 && index % 2 == 0 && <View style={{
                    height: hp('31%'),
                    width: wp('0.3%'),
                    backgroundColor: colors.lightGrey,
                    marginBottom: hp('0.5%')
                }}></View>}
            </View>
        )
    }
    function handleLoadMore() {
        let url = baseUrl + '&page=' + lastItemIndex + ':' + chunkSize
        fetchProducts(false, false, sortKey, sortOrder)
    }
    function fetchProducts(isFromFilter, isFromSort, sortKey, sortOrder) {
        setLoader(true)
        var _lastItemIndex = lastItemIndex
        if (isFromFilter || isFromSort) {
            _lastItemIndex = 0
        }
        let url = baseUrl + '&page=' + _lastItemIndex + ':' + 20 
        for (let i = 0; i < aggregations.length; i++) {
            for (let j = 0; j < aggregations[i].buckets.length; j++) {
                if (aggregations[i].buckets[j].isSelected) {
                    url += '&' + aggregations[i].name + '=' + aggregations[i].buckets[j].key 
                }
            }
        }
        if (sortKey != null && sortOrder != null) {
            url += '&sort=' + sortKey + ':' + sortOrder
        }
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(response => fetchProductsSuccess(response, _lastItemIndex))
            .catch(error => fetchProductsError(error));
    }
    function fetchProductsSuccess(response, __lastItemIndex) {
        setLoader(false)
        if (response.message == constants.success) {
            setProductsError(false)
            if (__lastItemIndex == 0) {
                setProducts(response.data.products)
                setTotalCount(response.data.totalCount)
                setTitle(response.data.title)
                setAggregations(response.data.aggregations)
                let sorts = []
                for (let i = 0; i < response.data.sorts.length; i++) {
                    for (let j = 0; j < response.data.sorts[i].orders.length; j++) {
                        sorts.push(response.data.sorts[i].orders[j])
                    }
                }
                setSorts(sorts)
            } else {
                let _products = products
                _products.push(...response.data.products)
                setProducts(_products)
            }
            let _lastItemIndex = lastItemIndex
            _lastItemIndex += chunkSize
            setLastItemIndex(_lastItemIndex)
        } else {
            setProductsError(true)
        }
    }
    function fetchProductsError(error) {
        setProductsError(true)
        setLoader(false)
    }
} 

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: colors.primary
    },
    productsContainer: {
        width: wp('100%'),
        height: Platform.OS == 'android' 
            ? hp('100%') - dimens.headerHeight - dimens.titleHeight - dimens.optionsHeight - dimens.locationHeight
            : hp('100%') - dimens.headerHeight - dimens.titleHeight - dimens.optionsHeight - dimens.locationHeight - dimens.iosStatusbarHeight,
    },
    productsErrorContainer: {
        width: wp('100%'),
        height: Platform.OS == 'android' 
            ? hp('100%') - dimens.headerHeight - dimens.titleHeight - dimens.optionsHeight - dimens.locationHeight
            : hp('100%') - dimens.headerHeight - dimens.titleHeight - dimens.optionsHeight - dimens.locationHeight - dimens.iosStatusbarHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderView: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Home