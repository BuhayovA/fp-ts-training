import React from 'react';
// libs
import NProgress from 'nprogress';
import styled from 'styled-components';
// types
import { ToastPosition } from 'react-hot-toast/src/core/types';
// context
import { toast } from 'react-hot-toast';

// types
interface OpenSuccessToastParam {
  type: 'SUCCESS';
  message?: string;
  position?: ToastPosition;
}

interface OpenWarnToastParam {
  type: 'WARN';
  message?: string;
  position?: ToastPosition;
}

interface OpenErrorToastParam {
  type: 'ERROR';
  error?: string | Error;
  position?: ToastPosition;
}

// styles
export const ToastWrapper = styled.div`
  padding: 15px;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  transition: all ease 0.5s;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  background: ${({ theme }) => theme.colors.white};
`;

export const Image = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const useUIActions = () => {
  // nprogress
  const startProgress = () => NProgress.start();

  const doneProgress = () => NProgress.done();

  const setProgress = (value: number) => NProgress.set(value);

  const removeProgress = () => NProgress.remove();

  // toast
  const openToast = (data: OpenErrorToastParam | OpenSuccessToastParam | OpenWarnToastParam) => {
    toast.dismiss();

    switch (data.type) {
      case 'SUCCESS':
        toast.success(data.message || 'Success!', { position: data.position || 'bottom-right' });
        break;
      case 'ERROR':
        if (typeof data.error !== 'string') {
          toast.error(data.error?.message || 'Oops... Something went wrong.', {
            position: data.position || 'top-center'
          });

          return;
        }

        toast.error(data.error || 'Oops... Something went wrong.', {
          position: data.position || 'top-center'
        });
        break;
      case 'WARN':
        toast.custom(() => (
          <ToastWrapper>
            <Image src='/static/images/warning.svg' />
            {data.message || 'Warning!'}
          </ToastWrapper>
        ));
    }
  };

  const closeToast = () => toast.dismiss();

  return {
    openToast,
    closeToast,
    setProgress,
    doneProgress,
    startProgress,
    removeProgress
  };
};

export { useUIActions };
