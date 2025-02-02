
'use client'

import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, ImagePlus, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SkinCancerPredictor = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setPrediction(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict/skin_cancer', {
        image: preview
      });

      if (response.data.success) {
        const predictionValue = response.data.prediction[0][0];
        setPrediction(predictionValue);
      } else {
        throw new Error(response.data.error || 'Prediction failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" px-4  "
    >
      <Card className="w-full py-10 max-w-2xl mx-auto bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 backdrop-blur-xl shadow-2xl border-none">

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6"
            >
              <Alert variant="destructive" className="border-red-400/20 bg-red-500/10">
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {prediction !== null && (
            <motion.div
              className="px-6 py-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {prediction > 0.5 ? (
                <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg flex items-center">
                  <XCircle className="w-6 h-6 text-red-300 mr-2" />
                  <div>
                    <AlertTitle className="text-red-200 font-semibold">
                      Cancer Detected
                    </AlertTitle>
                    <AlertDescription className="text-red-200/80">
                      The prediction indicates the presence of skin cancer.
                    </AlertDescription>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-300 mr-2" />
                  <div>
                    <AlertTitle className="text-green-200 font-semibold">
                      No Cancer Detected
                    </AlertTitle>
                    <AlertDescription className="text-green-200/80">
                      The prediction indicates no presence of skin cancer.
                    </AlertDescription>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-xl border-white/20 hover:border-blue-400/50 transition-colors bg-purple-800/20 group-hover:bg-purple-700/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center cursor-pointer w-full"
                >
                  <AnimatePresence mode="wait">
                    {preview ? (
                      <motion.img
                        key="preview"
                        src={preview}
                        alt="Preview"
                        className="w-64 h-64 object-cover rounded-xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.div
                        key="placeholder"
                        className="flex flex-col items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ImagePlus className="w-12 h-12 text-blue-300/70" />
                        <p className="mt-2 text-sm text-blue-200/70">
                          Click to upload an image (64x64 recommended)
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </label>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={!selectedImage || loading}
              className="w-full flex items-center justify-center py-4 px-4 rounded-xl
                text-white bg-blue-600 hover:bg-blue-500
                disabled:bg-purple-800/40 disabled:text-white/50 disabled:cursor-not-allowed
                transition-all duration-200 ease-in-out shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Processing...
                </motion.span>
              ) : (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Predict Risk
                </motion.div>
              )}
            </motion.button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkinCancerPredictor;