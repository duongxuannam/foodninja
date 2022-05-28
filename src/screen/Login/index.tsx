import React from 'react';
import {Text, Button, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {useLoginHook} from './loginHook';
import KeyboardAvoid from 'component/KeyboardAvoid';
import View from 'component/View';

const Login = () => {
  const {control, handleSubmit, onSubmit, errors} = useLoginHook();
  return (
    <KeyboardAvoid>
      <View
        w={200}
        h={500}
        mh={20}
        mt={100}
        mv={30}
        itemCenter
        contentCenter
        // flex={1}
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        />
        {errors.username && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && <Text>This is required.</Text>}

        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
    </KeyboardAvoid>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 200,
  },
  input: {
    padding: 20,
    borderColor: 'red',
    borderWidth: 1,
    width: '100%',
  },
});
