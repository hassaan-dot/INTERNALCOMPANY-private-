import { StyleSheet } from 'react-native';
import helpers from '../../../../utils/helpers';
import { PoppinsRegular } from '../../../../Resources/fonts';

class style {
  static getSheet() {
    return StyleSheet.create({
      textStyle: {
        fontSize: helpers.normalize(16),
        textAlign: 'center',
        includeFontPadding: false,
        color: '#ffffff',
        backgroundColor: 'transparent',
        fontFamily:PoppinsRegular
      },
      containerStyle: {
        borderRadius: helpers.normalize(8),
        height: helpers.normalize(45),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
      rightIconsContainerStyle: {
        marginLeft: helpers.normalize(0), // Space between text and right icon
      },
      buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }
}

export default style;

// import { StyleSheet } from 'react-native';
// import helpers from '../../../../utils/helpers';

// class style {
//   static getSheet() {
//     return StyleSheet.create({
//       textStyle: {
//         fontSize: helpers.normalize(16), 
//         textAlign: 'center',
//         includeFontPadding: false,
//         color: '#ffffff',
//         backgroundColor: 'transparent',
//       },
//       containerStyle: {
//         borderRadius: helpers.normalize(8),
//         height: helpers.normalize(45),
//         justifyContent: 'center',
//         alignItems: 'center',
//         overflow: 'hidden',

//       },
//       rightIconsContainerStyle: {
//       },
//       buttonStyle: {
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//     });
//   }
// }

// export default style;
