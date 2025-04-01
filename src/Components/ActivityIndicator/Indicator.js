import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View, Animated } from "react-native";

import Indicator from "./helper"; // Ensure `helper.js` correctly exports `Indicator`
import styles from "./Style"; // Ensure `Style.js` is correctly set up

export default class BallIndicator extends PureComponent {
  static propTypes = {
    ...Indicator.propTypes,
    color: PropTypes.string,
    size: PropTypes.number,
    count: PropTypes.number,
  };

  static defaultProps = {
    color: "#fff",
    count: 10,
    size: 40,
  };

  renderComponent = ({ index, count, progress }) => {
    const { size, color: backgroundColor } = this.props;
    const angle = (index * 360) / count;

    const layerStyle = {
      transform: [{ rotate: `${angle}deg` }],
    };

    const inputRange = Array.from({ length: count + 1 }, (_, i) => i / count);

    const outputRange = Array.from(
      { length: count },
      (_, i) => 1.2 - (0.5 * i) / (count - 1)
    );

    for (let j = 0; j < index; j++) {
      outputRange.unshift(outputRange.pop());
    }

    outputRange.unshift(outputRange[outputRange.length - 1]);

    const ballStyle = {
      margin: size / 20,
      backgroundColor,
      width: size / 5,
      height: size / 5,
      borderRadius: size / 10,
      transform: [{ scale: progress.interpolate({ inputRange, outputRange }) }],
    };

    return (
      <Animated.View style={[styles.layer, layerStyle]} key={index}>
        <Animated.View style={ballStyle} />
      </Animated.View>
    );
  };

  render() {
    const { style, size, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width: size, height: size }}
          renderComponent={this.renderComponent}
          {...props}
        />
      </View>
    );
  }
}
