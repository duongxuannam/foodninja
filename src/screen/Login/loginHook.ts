import {useForm} from 'react-hook-form';
import {useDispatch} from 'store/index';
import {loginAction} from 'store/user/thunk';

type FormData = {
  username: string;
  password: string;
};

const defaultFormValues = {
  username: '',
  password: '',
};

export const useLoginHook = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({defaultValues: defaultFormValues});

  const onSubmit = (data: FormData) => {
    console.log(data);
    onLogin();
  };

  const onLogin = async () => {
    dispatch(
      loginAction({
        id: '123',
        name: 'Nammm',
        token: 'day_la_cai_toke',
      }),
    );
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    onLogin,
  };
};
