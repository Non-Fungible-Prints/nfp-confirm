/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from 'next/image';
import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { SectionTemplate } from './SectionTemplate';
import { Anchor } from '../components';

export const Hero = () => {
  const [ step, setStep ] = useState(1);

  const submitContact = async (event) => {
    event.preventDefault();
    alert(`So your name is ${event.target.name.value}?`);
  };

  const step1 = () => (
    <div className="flex items-center justify-center space-x-2 animate-bounce">
      <div className="w-6 h-6 bg-purple-700 rounded-full" />
      <div className="w-6 h-6 bg-purple-700 rounded-full" />
      <div className="w-6 h-6 bg-purple-700 rounded-full" />
    </div>
  );

  const step2 = () => (
    <form className="flex flex-col" onSubmit={submitContact}>
      <label htmlFor="name" className="text-left mb-2 text-white">Contract Address</label>
      <input
        className="mb-4 border-2 border-white bg-black p-2 rounded-md text-white"
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 font-bold text-white bg-purple-700 rounded-md hover:bg-purple-800"
      >
        Validate NFP
      </button>
    </form>
  );

  const step3 = () => (
    <div className="flex flex-col">
      <h2 className="mx-auto text-xl font-bold text-gray-200">The Polacy</h2>
      <img className="mx-auto w-[50%] h-auto mb-2" src="https://lh3.googleusercontent.com/Xcv-f21b5bg7ll5klxhdreC-Vr3DK_voyYamQQ6jHOO-JYcPTvcK60oKrSzRv-odhqGM_ofc4vvguVIX06xxMUj287YbyLuMXVwO=w600" alt="polak" />
      <div className="mx-auto text-green-600 w-[50%] h-auto">
        <CheckCircleIcon />
      </div>
    </div>

  );

  const renderStep = () => {
    if (step === 1) {
      return step1();
    } if (step === 2) {
      return step2();
    } if (step === 3) {
      return step3();
    }

    return step1();
  };

  return (
    <SectionTemplate id="hero">
      <div className="min-h-screen w-full opacity-40 absolute flex flex-col">
        {
          [ ...Array(30) ].map(() => (
            <h1 className="text-3xl font-bold text-gray-200 mx-auto">
              Non Fungible
              {' '}
              <a className="text-purple-700">PRINTS</a>
            </h1>
          ))
        }
      </div>

      <div className="relative min-h-screen max-w-6xl mx-auto flex">
        <div className="my-auto text-center bg-black">
          <div className="my-24">
            <h1 className="text-3xl font-bold text-gray-200 mb-8">
              Non Fungible
              {' '}
              <a className="text-purple-700">PRINTS</a>
            </h1>

            {renderStep()}

            <button className="text-white" type="button" onClick={() => setStep(1)}>step-1</button>
            <button className="text-white" type="button" onClick={() => setStep(2)}>step-2</button>
            <button className="text-white" type="button" onClick={() => setStep(3)}>step-3</button>
          </div>

        </div>
      </div>
    </SectionTemplate>
  );
};
