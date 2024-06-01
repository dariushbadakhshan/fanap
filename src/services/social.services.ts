import { ServicesCatchError, fetchHelper } from '@helpers';
import { ContactModel, SocialParamsDataModel } from '@models';

const baseUrl = 'socials';

export const getSocialsService = async () => {
  try {
    const result: ContactModel[] = await fetchHelper(`${baseUrl}`, {
      method: 'GET'
    });
    return result;
  } catch (error) {
    ServicesCatchError(error);
  }
};

export const createSocialsService = async (data: SocialParamsDataModel) => {
  try {
    const result: ContactModel = await fetchHelper(
      `${baseUrl}`,
      {
        method: 'POST'
      },
      data
    );
    return result;
  } catch (error) {
    ServicesCatchError(error);
  }
};

export const updateSocialsService = async (id: string, data: SocialParamsDataModel) => {
  try {
    const result: ContactModel = await fetchHelper(
      `${baseUrl}/${id}`,
      {
        method: 'PUT'
      },
      data
    );
    return result;
  } catch (error) {
    ServicesCatchError(error);
  }
};

export const deleteSocialsService = async (id: string) => {
  try {
    const result = await fetchHelper(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
    return result;
  } catch (error) {
    ServicesCatchError(error);
  }
};
