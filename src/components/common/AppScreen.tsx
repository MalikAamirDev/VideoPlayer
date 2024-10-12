import {useScrollToTop, useTheme} from '@react-navigation/native';
import React, {useRef} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps as keyboardProps,
  Platform,
  SafeAreaView,
  ScrollView,
  ScrollViewProps as scrollProps,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import FocusAwareStatusBar from './FocusAwareStatusBar';
import {Colors, CustomTheme} from '../../theme';

interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: StatusBarStyle;
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: keyboardProps;
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed';
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  ScrollViewProps?: scrollProps;
}

export type ScreenProps = ScrollScreenProps | FixedScreenProps;

/**
 * Screen with out scrolling
 */
function ScreenWithoutScrolling(props: ScreenProps) {
  const {contentContainerStyle, children, style} = props;
  return (
    <View style={[styles.outerStyle, style]}>
      <View style={[styles.innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  );
}

/**
 * Screen with scrolling
 *
 */
function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = 'handled',
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <ScrollView
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      ref={ref}
      {...ScrollViewProps}
      onLayout={e => {
        ScrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        ScrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[styles.outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[styles.innerStyle, contentContainerStyle]}>
      {children}
    </ScrollView>
  );
}

/**
 * Represents a screen component that provides a consistent layout and behavior for different screen presets.
 * The `Screen` component can be used with different presets such as "fixed", "scroll".
 * It handles safe area insets, status bar settings, keyboard avoiding behavior, and scrollability based on the preset.
 */
export default function Screen(props: ScreenProps) {
  /*
   ** Destructing props
   */
  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    statusBarStyle = 'default',
    preset = 'fixed',
  } = props;
  /*
   ** Hooks
   */
  const {colors} = useTheme() as CustomTheme;

  return (
    <View style={[$containerStyle(colors), {backgroundColor}]}>
      <SafeAreaView />
      <FocusAwareStatusBar barStyle={statusBarStyle} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[styles.keyboardStyle, KeyboardAvoidingViewProps?.style]}>
        {preset === 'fixed' ? <ScreenWithoutScrolling {...props} /> : <ScreenWithScrolling {...props} />}
      </KeyboardAvoidingView>
    </View>
  );
}
/*
 ** This style approach is used for synamic styles
 */
const $containerStyle = (colors: Colors): ViewStyle => {
  return {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.background,
  };
};

const styles = StyleSheet.create({
  innerStyle: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  keyboardStyle: {
    flex: 1,
  },

  outerStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
