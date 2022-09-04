/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { SectionTemplate } from './SectionTemplate';
import { client, getNFCStatusChanged, isNFCDestroyed } from '../queries';
import { Loader } from '../components';

// eslint-disable-next-line no-shadow
enum State {
  Loading = 'loading',
  Address = 'address',
  Validate = 'validate',
}

export const Hero = () => {
  const router = useRouter();
  const { contract, tag } = router.query;

  const [localTag, setLocalTag] = useState(tag);
  const [step, setStep] = useState<State>(State.Loading);
  const [nftAddress, setNftAddress] = useState(contract as string);
  const [lsNftAddress, setLsNftAddress] = useState('');
  const [nfp, setNfp] = useState<any>({});

  const [isValid, setIsValid] = useState(false);

  const setNftAddressToLocalStorage = (address: string) =>
    localStorage.setItem('nftAddress', address);
  const getNftAddressFromLocalStorage = () => localStorage.getItem('nftAddress');

  const validateNFT = async () => {
    if (lsNftAddress) setNftAddressToLocalStorage(lsNftAddress);

    const isNFCDestroyedResponse = await client.query(isNFCDestroyed, { localTag }).toPromise();

    console.log(isNFCDestroyedResponse);

    if (isNFCDestroyedResponse?.data?.nfcdestroyeds.length) {
      setIsValid(false);
    } else {
      const response = await client.query(getNFCStatusChanged, { nftAddress }).toPromise();

      if (response.data && response.data.nfcstatusChangeds) {
        const nfps = response.data.nfcstatusChangeds;
        // console.log(nfps);
        const sortedNfps = nfps.sort((a: any, b: any): any => {
          if (parseInt(a.nftInfo_lastUpdated, 10) > parseInt(b.nftInfo_lastUpdated, 10)) {
            return -1;
          }

          return 0;
        });

        const filteredNfp = sortedNfps.filter((nfpF: any) => nfpF.nfcTag === localTag)[0];
        // console.log(filteredNfp);

        if (filteredNfp.nftInfo_nftAddress.toLowerCase() === lsNftAddress!.toLowerCase()) {
          setIsValid(filteredNfp.nftInfo_isActive);
        }

        setNfp(filteredNfp);
      }
    }

    setStep(State.Validate);
  };

  useEffect(() => {
    // if (!localTag) return;

    const nftAddressLs = getNftAddressFromLocalStorage();

    if (typeof contract === 'string' && contract) setNftAddress(contract);
    if (typeof tag === 'string' && tag) setLocalTag(tag);
    if (nftAddressLs) setNftAddressToLocalStorage(nftAddressLs);

    if (nftAddressLs) {
      setLsNftAddress(nftAddressLs);
      (async () => {
        await validateNFT();
      })();
    } else {
      setStep(State.Address);
    }
  }, [step, nftAddress, tag]);

  const step2 = () => (
    <div className="flex flex-col">
      <label htmlFor="name" className="text-left mb-2 text-white">
        Contract Address
      </label>
      <input
        className="mb-4 border-2 border-white bg-black p-2 rounded-md text-white"
        id="contract"
        name="contract"
        type="text"
        value={lsNftAddress}
        onChange={(event) => setLsNftAddress(event.target.value)}
        required
      />
      <button
        type="submit"
        onClick={async () => {
          await validateNFT();
        }}
        className="px-4 py-2 font-bold text-white bg-purple-700 rounded-md hover:bg-purple-800"
      >
        Validate NFP
      </button>
    </div>
  );

  const step3 = () => (
    <div className="flex flex-col">
      <h2 className="mx-auto text-xl font-bold text-gray-200">{nfp.nftInfo_nftName}</h2>

      {isValid ? (
        <div className="mx-auto text-green-600 w-[30%] h-auto">
          <CheckCircleIcon />
          <span className="text-bold">Valid</span>
        </div>
      ) : (
        <div className="mx-auto text-red-600 w-[30%] h-auto">
          <XCircleIcon />
          <span className="text-bold">Not Valid</span>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    const map = {
      loading: <Loader />,
      address: step2(),
      validate: step3(),
    };

    return map[step as State];
  };

  return (
    <SectionTemplate id="hero">
      <div className="min-h-screen w-full opacity-40 absolute flex flex-col">
        {[...Array(20)].map(() => (
          <h1 className="text-3xl font-bold text-gray-200 mx-auto">
            Non Fungible <a className="text-purple-700">PRINTS</a>
          </h1>
        ))}
      </div>

      <div className="relative min-h-screen max-w-6xl mx-auto flex">
        <div className="my-auto text-center bg-black">
          <div className="my-24">
            <h1 className="text-3xl font-bold text-gray-200 mb-8">
              Non Fungible <a className="text-purple-700">PRINTS</a>
            </h1>

            {renderStep()}
          </div>
        </div>
      </div>
    </SectionTemplate>
  );
};
