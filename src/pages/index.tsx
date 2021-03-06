import {
  Alert,
  AlertIcon,
  Button,
  Collapse,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormInput } from '~/components';
import { useAuth } from '~/contexts';
import { withServerSideGuest } from '~/utils/ssr';

export interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Não é um e-mail válido')
    .required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const { formState, handleSubmit, register } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  async function handleSignIn(data: SignInFormData) {
    try {
      setErrorMsg('');
      await signIn(data);
      router.replace('/dashboard');
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message ?? error.message);
    }
  }

  return (
    <>
      <Head>
        <title>Sign In | Dashgo</title>
      </Head>

      <Flex align="center" justify="center" h="100vh" w="100vw">
        <Flex
          as="form"
          noValidate
          direction="column"
          w="100%"
          maxW={360}
          borderRadius={8}
          bg="gray.800"
          p="8"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Collapse in={Boolean(errorMsg)} animateOpacity>
              <Alert
                status="error"
                mb="4"
                borderRadius="md"
                color="red.700"
                fontWeight="bold"
              >
                <AlertIcon />
                {errorMsg}
              </Alert>
            </Collapse>

            <FormInput
              autoFocus
              error={formState.errors.email}
              label="E-mail"
              type="email"
              {...register('email')}
            />
            <FormInput
              error={formState.errors.password}
              label="Senha"
              type="password"
              {...register('password')}
            />
          </Stack>

          <Button
            isLoading={formState.isSubmitting}
            type="submit"
            size="lg"
            mt="6"
            colorScheme="pink"
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = withServerSideGuest(async () => {
  return {
    props: {},
  };
});
