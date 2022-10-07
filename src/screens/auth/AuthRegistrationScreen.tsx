import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Navigation from '../../base/Navigation';
import { useRootStore } from '../../base/hooks/useRootStore';
import { PasswordVisibilityButton } from '../../components/PasswordVisibilityButton';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import FormValidationHelper from '../../helpers/FormValidationHelper';
import { RegistrationFormFields } from '../../modules/auth/forms/RegistrationForm';
import { screens } from '../../navigation/consts/screens';
import { stacks } from '../../navigation/consts/stacks';
import { DefaultStyles } from '../../styles/DefaultStyles';

export const AuthRegistrationScreen = observer(() => {
  const { authStore } = useRootStore();

  const insets = useSafeAreaInsets();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    return () => authStore.resetRegistrationForm();
  }, []);

  const handleChangeForm = (key: RegistrationFormFields, value: string) => {
    authStore.changeRegistrationForm(key, value);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmitRegistration = async () => {
    Keyboard.dismiss();
    const isRegistered = await authStore.register();

    if (isRegistered) {
      Navigation.replace(stacks.HOME_STACK, { screen: screens.HOME_MAIN });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 16 }]}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
    >
      <Input
        isRequired
        value={authStore.registrationForm.username}
        onChangeText={value => handleChangeForm(RegistrationFormFields.username, value)}
        placeholder={'Name'}
        testID={'inputName'}
      />

      <Input
        isRequired
        value={authStore.registrationForm.email}
        onChangeText={value => handleChangeForm(RegistrationFormFields.email, value)}
        placeholder={'E-mail'}
        autoCapitalize={'none'}
        keyboardType={'email-address'}
        isValid={FormValidationHelper.isEmailValid(authStore.registrationForm.email)}
        errorMessage={'Invalid email'}
        containerStyle={DefaultStyles.mt24}
        testID={'inputEmail'}
      />

      <Input
        isRequired
        value={authStore.registrationForm.password}
        onChangeText={value => handleChangeForm(RegistrationFormFields.password, value)}
        placeholder={'Password'}
        autoCapitalize={'none'}
        secureTextEntry={!isPasswordVisible}
        containerStyle={DefaultStyles.mt24}
        rightComponent={
          <PasswordVisibilityButton
            isVisible={isPasswordVisible}
            onPress={handlePasswordVisibility}
            testID={'buttonShowPassword'}
          />
        }
        testID={'inputPassword'}
      />

      <Input
        isRequired
        value={authStore.registrationForm.repeatedPassword}
        onChangeText={value => handleChangeForm(RegistrationFormFields.repeatedPassword, value)}
        placeholder={'Password repeat'}
        autoCapitalize={'none'}
        isValid={FormValidationHelper.isSameString(
          authStore.registrationForm.password,
          authStore.registrationForm.repeatedPassword,
        )}
        errorMessage={'Password must be repeated exactly'}
        secureTextEntry={!isPasswordVisible}
        containerStyle={DefaultStyles.mt24}
        testID={'inputRepeatedPassword'}
      />

      <Button
        title={'Submit'}
        onPress={handleSubmitRegistration}
        disabled={!authStore.registrationForm.isFormValid(authStore.registrationForm)}
        loading={authStore.registrationLoading}
        wrapperStyle={[styles.submitButtonContainer, DefaultStyles.mt24]}
        testID={'buttonSubmit'}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  submitButtonContainer: {
    width: '100%',
  },
});
