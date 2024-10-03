import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function Client() {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // fetch(`https://mlu2cjiiom2byubbw6fepez6yq0zfvqe.lambda-url.eu-west-3.on.aws/${id}`)
    fetch(`http://localhost:3000/clients/${id}`)
      .then((response) => response.json())
      .then((response) => {console.log({response}); return response})
      .then((data) => setClient(data?.data))
      .catch((error) => console.error("Error fetching client data:", error));
  }, [id]);

  if (!client) {
    return <Layout>
    <div>Loading...</div>
    </Layout> ;
  }
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetch(`https://mlu2cjiiom2byubbw6fepez6yq0zfvqe.lambda-url.eu-west-3.on.aws/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };


  function onSubmit() {

    //.............
}

return (
    <Layout>
        <div className="grid gap-4 ">
            
        <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Informations du client</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Nom et Prénoms :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{client.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Entrprise :</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{client.company}</dd>
          </div>
        </dl>
      </div>
    </div>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium leading-6 text-gray-900">Fichiers</dt>
        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                    <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Download
                    </a>
                </div>
                </li>
            </ul>
        </dd>
    </div>

    <div className="grid gap-1">
        <h1>Upload File:</h1>
        <form onSubmit={onSubmit()}>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => handleFileUpload(e)}
            />
                <div className="border border-radius-2" onClick={() => document.getElementById("fileInput").click()}>
                <svg className=" inset-0 h-full w-full stroke-gray-900/10" fill="none">
              <defs>
                <pattern id="pattern-d09edaee-fc6a-4f25-aca5-bf9f5f77e14a" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                </pattern>
              </defs>
              <rect stroke="none" fill="url(#pattern-d09edaee-fc6a-4f25-aca5-bf9f5f77e14a)" width="100%" height="100%"></rect>
            </svg>
                </div>
            <button type="submit">Envoyer</button>
        </form>
    </div>
    </div>
    </Layout>
);
}
