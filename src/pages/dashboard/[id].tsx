'use client';

import CardWrapper from '@/components/UI/CardWrapper';
import Complete from '@/components/UI/Complete';
import Incomplete from '@/components/UI/Incomplete';
import PageLayout from '@/components/UI/PageLayout';
import {
  IChatMessage,
  receiveMessages,
  retrieveExistingMessages,
} from '@/utils/waku';
import { IMessage, LightNode } from '@waku/sdk';
import React, { useEffect, useState } from 'react';

interface Props {
  node: LightNode;
}

const campaigns = [
  {
    address: '0xE956F831Db3ccad88836162b491BCb733117faac',
    status: false,
  },
  {
    address: '0xFf8C547027A357b94c25e1754dD21f0c7f68FD14',
    status: false,
  },
];

const Index = ({ node }: Props) => {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const subscribeToVotes = async () => {
      console.log('Listening for messages');
      await retrieveExistingMessages(node, processReceivedVote);
      await receiveMessages(node, processReceivedVote);
    };

    const processReceivedVote = (message: IChatMessage) => {
      console.log('received');
      const res = message.message.split('|');
      if (res.length > 1) {
        console.log(res[0]);
        for (let i = 0; i < campaigns.length; i++) {
          if (campaigns[i].address == res[0]) {
            console.log(campaigns[i]);
            campaigns[i].status = true;
            break;
          }
        }
        console.log(campaigns);
        setUpdate(true);
      }
    };

    subscribeToVotes();
  }, [node]);

  return (
    <div className='min-h-screen'>
      <PageLayout title='Dashboard' />
      <div className='max-w-2xl mx-auto'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
            <thead className='text-xs text-gray-700 uppercase '>
              <tr>
                <th scope='col' className='px-6 py-3 bg-gray-50 '>
                  Wallet Address
                </th>
                <th scope='col' className='px-6 py-3 bg-white '>
                  Campaign Status
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((item, index) => (
                <tr className='border-b border-gray-200' key={index}>
                  <td className='px-6 py-4 bg-gray-50 '>{item.address}</td>
                  <td className='px-6 py-4 bg-white '>
                    {item.status ? <Complete /> : <Incomplete />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
