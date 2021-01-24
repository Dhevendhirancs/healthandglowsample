import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export const headerHeight = hp('8%')
export const titleHeight = hp('5%')
export const optionsHeight = hp('7%')
export const locationHeight = hp('5.5%') + hp('0.5%') // hp('0.5%') is for bottom shadow padding
export const iosStatusbarHeight = hp('2%')