import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { subscribeUser } from "~/services/subscriptionService.server";
import type { ActionValidationErrors } from "~/types/commonTypes";

export const action = async ({ request }: ActionFunctionArgs) => {
  const errors: ActionValidationErrors = {};
  try {
    const body = await request.formData();

    const subscriber = await subscribeUser(body, errors);

    if (Object.keys(errors).length) {
      return json({ status: 400, errors });
    }

    return json({ status: 200, message: "Success", subscriber });
  } catch (err) {
    console.error("err", err);
    errors.other = `${err}`;
    return json({ status: 500, errors });
  }
};
