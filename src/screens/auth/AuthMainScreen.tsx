import { useBackHandler } from '@react-native-community/hooks';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { PasswordVisibilityButton } from '../../components/PasswordVisibilityButton';
import { Button, ButtonType } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import FormValidationHelper from '../../helpers/FormValidationHelper';
import { LoginFormFields } from '../../modules/auth/forms/LoginForm';
import { Screens } from '../../navigation/consts/screens';
import { Stacks } from '../../navigation/consts/stacks';
import { Tabs } from '../../navigation/consts/tabs';
import { AuthStackParamList } from '../../navigation/types/AuthStackTypes';

export const AuthMainScreen = observer(() => {
  const { authStore } = useRootStore();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useBackHandler(() => {
    return Navigation.navigationRef.current?.getCurrentRoute()?.name === Screens.AUTH_MAIN;
  });

  useEffect(() => {
    return () => authStore.resetLoginForm();
  }, []);

  const handleChangeForm = (key: LoginFormFields, value: string) => {
    authStore.changeLoginForm(key, value);
  };

  const handleNavigateToRegistration = () => {
    Navigation.navigate<AuthStackParamList>(Stacks.AUTH_STACK, { screen: Screens.AUTH_REGISTRATION });
  };

  const handleSubmitLogin = async () => {
    Keyboard.dismiss();
    const isLogged = await authStore.login();

    if (isLogged) {
      Navigation.replace(Screens.MAIN_APP, { screen: Tabs.HOME });
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false} keyboardShouldPersistTaps={'handled'}>
      <Input
        value={authStore.loginForm.email}
        onChangeText={value => handleChangeForm(LoginFormFields.email, value)}
        placeholder={'E-mail'}
        keyboardType={'email-address'}
        autoCapitalize={'none'}
        isValid={FormValidationHelper.isEmailValid(authStore.loginForm.email)}
        errorMessage={'Invalid email'}
        testID={'inputEmail'}
      />

      <Input
        value={authStore.loginForm.password}
        onChangeText={value => handleChangeForm(LoginFormFields.password, value)}
        placeholder={'Password'}
        autoCapitalize={'none'}
        secureTextEntry={!isPasswordVisible}
        containerStyle={styles.item}
        rightComponent={
          <PasswordVisibilityButton
            isVisible={isPasswordVisible}
            onPress={handlePasswordVisibility}
            testID={'buttonShowPassword'}
          />
        }
        testID={'inputPassword'}
      />

      <View style={styles.registerContainer}>
        <Button
          title={'Sign up'}
          onPress={handleNavigateToRegistration}
          type={ButtonType.Flat}
          containerStyle={styles.registerButton}
          testID={'buttonRegistration'}
        />
      </View>

      <Button
        title={'Sign in'}
        onPress={handleSubmitLogin}
        disabled={!authStore.loginForm.isFormValid(authStore.loginForm)}
        loading={authStore.loginLoading}
        wrapperStyle={[styles.loginButtonContainer, styles.item]}
        testID={'buttonSubmit'}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  item: {
    marginTop: 24,
  },

  registerContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  registerButton: {
    paddingHorizontal: 0,
  },

  loginButtonContainer: {
    width: '100%',
  },
});
