// 'use client'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useDebounceCallback } from 'usehooks-ts'
// import { useToast } from "@/components/ui/use-toast"
// import { useRouter } from "next/navigation"
// import { signUpSchema } from "@/schemas/signUpSchema"
// import axios, {AxiosError} from 'axios'
// import { ApiResponse } from "@/types/ApiResponse"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Icon, LoaderPinwheel } from 'lucide-react';
// import { burger } from '@lucide/lab';



// function page() {
//   const [username, setUsername] = useState(' ')
//   const [UsernameMessage, setUsernameMessage] = useState(' ')
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const debounced = useDebounceCallback(setUsername, 300)
//   const { toast } = useToast()
//   const router = useRouter();

//   //zod implementation
//   const form  = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       username: '',
//       email: '',
//       password: ''
//     }
//   })

//   useEffect(() => {
//       const checkUsernameUniqueness = async () => {
//         if (debouncedUsername){
//           setIsCheckingUsername(true)
//           setUsernameMessage('')
//           try {
//             const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
//             setUsernameMessage(response.data.message)
//           } catch (error) {
//             const AxiosError = error as AxiosError<ApiResponse>
//             setUsernameMessage(
//               AxiosError.response?.data.message ?? "Error checking username"
//             )
//           } finally {
//             setIsCheckingUsername(false)
//           }
//         }
//       }
//       checkUsernameUniqueness()
//   }, [debouncedUsername] )

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//       setIsSubmitting(true)
//       try {
//         const response = await axios.post<ApiResponse>('/api/sign-up', data)
//         toast({
//           title: 'Success',
//           description: response.data.message
//         })
//         router.replace(`/verify/${username}`)
//         setIsSubmitting(false)
//       } catch (error) {
//         console.error("Error in sign-up of user", error)
//         const axiosError = error as AxiosError<ApiResponse>;
//         let errorMessage = axiosError.response?.data.message
//         toast({
//           title: "Signup failed",
//           description: errorMessage,
//           variant: "destructive"
//         })
//         setIsSubmitting(false)
//       }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//             Join Mistry Message
//           </h1>
//           <p className="mb-4">Signup to start your anonymous adventure</p>
//         </div>
//       </div>
//       <div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               name="username"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Username</FormLabel>
//                   <FormControl>
//                     <Input placeholder="enter username" {...field}
//                     onChange={(e) => {
//                       field.onChange(e)
//                       setUsername(e.target.value)
//                     }}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//               />
//               <FormField
//               name="email"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input placeholder="enter email" {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//               />
//               <FormField
//               name="password"
//               control={form.control}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>password</FormLabel>
//                   <FormControl>
//                     <Input type="password" placeholder="enter password" {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//               />
//               <Button type="submit" disabled={isSubmitting}>
//                 {
//                   isSubmitting ? (
//                     <>
//                     <LoaderPinwheel className="mr-2 h-4 w-4 animate-spin"/> Please wait
//                     </>
//                   ) : ('SignUp')
//                 }
//               </Button>
//           </form>
//         </Form>
//         <div className="text-center mt-4">
//           <p>
//             Already a member?{' '}
//             <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
//             Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default page

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';

function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to Mistry Message
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                  <Input placeholder="email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                  <Input placeholder='password' type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page