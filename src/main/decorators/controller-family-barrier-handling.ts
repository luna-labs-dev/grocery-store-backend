import { Controller, unauthorized } from '@/api';
import { GetUser } from '@/domain';
import { container } from 'tsyringe';
import { injection } from '../di/injection-codes';
import { Constructor } from './decorator-types';

const { usecases } = injection;
export const controllerFamilyBarrierHandling = () => {
  return <T extends Constructor<Controller>>(target: T) => {
    const originalHandle = target.prototype.handle;

    target.prototype.handle = async function (request: any) {
      try {
        const getUser = container.resolve<GetUser>(usecases.getUser);

        const externalUserId = request.user;
        if (!externalUserId) {
          console.error('external user id is not provided');
          return unauthorized();
        }

        const dbUserResult = await getUser.execute({
          externalId: externalUserId,
        });

        if (dbUserResult.isLeft()) {
          return unauthorized({
            requiredAction: 'register-user',
          });
        }

        const dbUser = dbUserResult.value;

        if (!dbUser.familyId) {
          // if user is not member of any family, return unauthorized with required action to add user to family
          return unauthorized({
            requiredAction: 'add-user-to-family',
          });
        }

        request.familyId = dbUser.familyId;

        const httpResponse = await originalHandle.apply(this, [request]);

        return httpResponse;
      } catch (error) {
        console.log(error);

        return unauthorized();
      }
    };
    return target;
  };
};
