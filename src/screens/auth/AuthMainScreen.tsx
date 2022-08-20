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
import { screens } from '../../navigation/consts/screens';
import { stacks } from '../../navigation/consts/stacks';
import { AuthStackParamList } from '../../navigation/types/AuthStackTypes';
import { DefaultStyles } from '../../styles/DefaultStyles';

export const AuthMainScreen = observer(() => {
  const { authStore } = useRootStore();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    return () => authStore.resetLoginForm();
  }, []);

  const handleChangeForm = (key: LoginFormFields, value: string) => {
    authStore.changeLoginForm(key, value);
  };

  const handleNavigateToRegistration = () => {
    Navigation.navigate<AuthStackParamList>(stacks.AUTH_STACK, { screen: screens.AUTH_REGISTRATION });
  };

  const handleSubmitLogin = async () => {
    Keyboard.dismiss();
    const isLogged = await authStore.login();

    if (isLogged) {
      Navigation.replace(stacks.HOME_STACK, { screen: screens.HOME_MAIN });
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
      />

      <Input
        value={authStore.loginForm.password}
        onChangeText={value => handleChangeForm(LoginFormFields.password, value)}
        placeholder={'Password'}
        autoCapitalize={'none'}
        secureTextEntry={!isPasswordVisible}
        containerStyle={DefaultStyles.mt24}
        rightComponent={<PasswordVisibilityButton isVisible={isPasswordVisible} onPress={handlePasswordVisibility} />}
      />

      <View style={[styles.registerContainer, DefaultStyles.mt8]}>
        <Button
          title={'Sign up'}
          onPress={handleNavigateToRegistration}
          type={ButtonType.Flat}
          containerStyle={styles.registerButton}
        />
      </View>

      <Button
        title={'Sign in'}
        onPress={handleSubmitLogin}
        disabled={!authStore.loginForm.isFormValid(authStore.loginForm)}
        loading={authStore.loginLoading}
        wrapperStyle={[styles.loginButtonContainer, DefaultStyles.mt24]}
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

  registerContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  registerButton: {
    paddingHorizontal: 0,
  },

  loginButtonContainer: {
    width: '100%',
  },
});
