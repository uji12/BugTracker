'use client'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm,Controller} from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import createIssueSchema from '@/app/validationSchema';
import {z} from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
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
      await axios.post('/api/issues',data);
      router.push('/issues');
    }
      catch(error){
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
        <Button>Submit new issue</Button>
    </form>
    </div>
  )  
}

export default NewIssuePage