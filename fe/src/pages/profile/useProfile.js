import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTeacherByUserId, getTeacher } from '../../services/teacherService';

export default function useListTeacher() {
  const { user_id } = useParams();

  const initialData = {
    photo_url: '',
    background_image_url: '',
    name: '',
    gender: '',
    address: '',
    latitude: 0,
    longitude: 0,
    lang_teach: '',
    date_of_birth: '',
    country_of_birth: '',
    description: '',
    certificates: [
      {
        language_code: '',
        level: '',
      },
    ],
    phone_number: '',
    gmail: '',
    resume_url: '',
    linkedin_url: '',
    twitter_url: '',
    facebook_url: '',
    instagram_url: '',
  }

  const parseData = useCallback((data) => {
    const profile = {
      photo_url: data?.photo_url ? (data.photo_url.startsWith("http") ? data.photo_url : `http://tungsnk.tech:9999${data?.photo_url}`) : '',
      background_image_url: data?.background_image_url ? (data.background_image_url.startsWith("http") ? data.background_image_url : `http://tungsnk.tech:9999${data?.background_image_url}`) : '',
      name: data?.name || '',
      gender: data?.gender || '',
      address: data?.address || '',
      latitude: data?.latitude || 0,
      longitude: data?.longitude || 0,
      lang_study: data?.lang_study || '',
      lang_teach: data?.lang_teach || '',
      date_of_birth: data?.date_of_birth || '',
      country_of_birth: data?.country_of_birth || '',
      description: data?.description || '',
      certificates: data?.certificates || [],
      phone_number: data?.phone_number || '',
      gmail: data?.gmail || '',
      resume_url: data?.resume_url || '',
      linkedin_url: data?.linkedin_url || '',
      twitter_url: data?.twitter_url || '',
      facebook_url: data?.facebook_url || '',
      instagram_url: data?.instagram_url || '',
      price: data?.price || '',
      hours: data?.hours || '',
    }
    return profile;
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['profile', user_id],
    queryFn: async () => {
      const teacherIdResponse = await getTeacherByUserId(user_id);
      const teacherId = teacherIdResponse.data?.id || null;
      if (!teacherId) {
        return initialData;
      }
      const teacherResponse = await getTeacher(teacherId);
      const parsedData = parseData(teacherResponse.data);
      return parsedData || initialData; // Ensure a defined value is returned
    },

    staleTime: 120 * 1000,
    enabled: !!user_id,
  });

  return {
    teacher: data || initialData,
    isSuccess,
    isLoading,
  };
}