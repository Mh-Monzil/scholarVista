import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const ApplyModal = ({ closeModal, isOpen, scholarship }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-xl pb-3 font-medium text-center leading-6 text-gray-900"
                >
                  Please Pay Application Fees First
                </DialogTitle>
                <div className="mt-2">
                  <p>University: {scholarship?.universityName}</p>
                </div>
                <div className="mt-2">
                  <p>Subject Category: {scholarship?.subjectCategory}</p>
                </div>
                <div className="mt-2">
                  <p>University: {scholarship?.subjectName}</p>
                </div>
                <div className="mt-2">
                  <p>Stipend: {scholarship?.stipend}</p>
                </div>

                <div className="my-2">
                  <p className="text-sm text-gray-500">
                    Fees: {scholarship?.applicationFees}
                  </p>
                </div>
                <Elements stripe={stripePromise}>
                    {/* checkout form */}
                    <CheckoutForm isOpen={isOpen} closeModal={closeModal} scholarship={scholarship} />
                    </Elements>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ApplyModal;
