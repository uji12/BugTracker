'use client'
import ErrorMessage from '@/app/components/ErrorMessage';
import createIssueSchema from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';
// interface IssueForm{
//   title:string,
//   description:string
// }
type IssueForm= z.infer<typeof createIssueSchema>
const NewIssuePage = () => {
  const {register,control,handleSubmit,formState:{errors}}=useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  }) 
  const router = useRouter();
  const [error,setError] =useState('')
  const[issubmitted,setIssubmitted] =useState(false)
  return (
    <div className='max-w-xl'>  
     {
         error && 
         <Callout.Root color="red" className='mb-5'>
           <Callout.Text>{error}</Callout.Text>
         </Callout.Root> 
    } 
    <form className=' space-y-3'
    onSubmit={handleSubmit(async (data)=>{
      try{
      setIssubmitted(true) ; 
      await axios.post('/api/issues',data);
      router.push('/issues');
    }
      catch(error){
        setIssubmitted(false) ;
        setError('An Error occurred !!!' );
      }
    })}
    >
       <TextField.Root  placeholder='Title' {...register('title')}>
        </TextField.Root>
         <ErrorMessage>
            {errors.title?.message}
          </ErrorMessage>
        <Controller name='description' control={control}
         render={({field})=>
         <SimpleMDE placeholder="Description" {...field}
         /> }/>
         <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>
        <Button disabled={issubmitted}>
          {issubmitted?<>submiting<Spinner/></>:'submit'}
        </Button>
    </form>
    </div>
  )  
}

export default NewIssuePage