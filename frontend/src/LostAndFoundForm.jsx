import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormDatepicker from "./FormDatepicker";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { Image } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";

function LostAndFoundForm() {
    const { handleSubmit, register, reset, setValue, getValues } = useForm();
    const [selectedDate, setSelectedDate] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const onSubmit = (data) => {
        if (!data.location || !data.itemName || !data.itemType || !data.lostPlace || !data.qty || !data.textarea) {
            toast.error("Please fill all the fields");
            return;
        }

        if (!getValues('itemImage') || getValues('itemImage').length === 0) {
            toast.error("Please select at least one image");
            return;
        }


        data.dateFound = selectedDate;
        console.log(data);
        reset();
    };

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            setImageLoading(true);

            reader.onload = () => {
                setValue('itemImage', [reader.result]);
                setImageLoading(false);
            };

            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="flex justify-center items-center min-h-screen m-10">
            <section className="w-[52rem] p-6 mx-auto bg-gray-100 rounded-md shadow-md dark:bg-gray-800">
                <h1 className="text-xl font-bold text-gray-600 capitalize dark:text-gray-600">
                    Connecting lost treasures with their rightful owners.
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="form-label" htmlFor="itemName">Item Name</label>
                            <input {...register("itemName")} className="form-input" />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="lostPlace">Lost Place </label>
                            <input {...register("lostPlace")} className="form-input" />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="itemType">Item Type</label>
                            <input {...register("itemType")} className="form-input" />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="location">Location</label>
                            <select className="form-input" {...register("location")}>
                                <option value="talpur">Talpur</option>
                                <option value="main-building">Main Building</option>
                                <option value="it-tower">IT Tower</option>
                            </select>
                        </div>

                        <div>
                            <label className="form-label" htmlFor="qty">Quantity</label>
                            <input {...register("qty")} className="form-input" />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="dateFound">Date Found</label>
                            <FormDatepicker onDateChange={setSelectedDate} />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="textarea">Item Description</label>
                            <textarea {...register("textarea")} className="h-32 form-input" />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="itemImage">Items Images</label>
                            <div {...getRootProps()} className="cursor-pointer h-32 form-input dropzone border-dashed border-spacing-10 space-y-1 text-center">
                                <Image className="mx-auto h-12 w-12 text-gray-600" />
                                <input {...getInputProps()} />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative bg-blue-500 rounded-md font-medium text-white px-2 py-0.1 text-sm" >
                                        <span className="">Upload a file</span>
                                    </label>
                                    <p className="pl-1 text-gray-600">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                            {imageLoading ? (
                                <ClipLoader className="font-medium text-blue-300 text-center" loading={true} size={25} />
                            ) : (
                                <>
                                    <img src={getValues('itemImage')} alt="Preview" className="h-16 object-cover" />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className="font-medium px-6 py-2 leading-5 text-gray-100 transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                            Save
                        </button>
                    </div>
                </form>
            </section>
        </div >
    );
}

export default LostAndFoundForm;
