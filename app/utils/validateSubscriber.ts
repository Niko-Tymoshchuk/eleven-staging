import Joi from "joi";
import type { ActionValidationErrors, SubscriberDataType } from "~/types";

export function prepareSubscriberData(subscriber: FormData) {
  return {
    email: subscriber.get("email")?.toString() || "",
    name: subscriber.get("name")?.toString() || "",
    lifePathNumber: parseInt(
      subscriber.get("lifePathNumber")?.toString() || "0",
    ),
    expressionNumber: parseInt(
      subscriber.get("expressionNumber")?.toString() || "0",
    ),
    soulNumber: parseInt(subscriber.get("soulNumber")?.toString() || "0"),
    personalNumber: parseInt(
      subscriber.get("personalNumber")?.toString() || "0",
    ),
    dateOfBirth: new Date(subscriber.get("dateOfBirth")?.toString() || ""),
  };
}

export function validateSubscriber(
  data: ReturnType<typeof prepareSubscriberData>,
  errors: ActionValidationErrors,
): data is SubscriberDataType {
  const subscriberSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    lifePathNumber: Joi.number().integer().min(0).max(33).required(),
    expressionNumber: Joi.number().integer().min(0).max(33).required(),
    soulNumber: Joi.number().integer().min(0).max(33).required(),
    personalNumber: Joi.number().integer().min(0).max(33).required(),
    dateOfBirth: Joi.date().required(),
  });

  const { error } = subscriberSchema.validate(data, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((detail) => {
      errors[detail.path[0] as keyof ActionValidationErrors] = detail.message;
    });
    return false;
  }
  return true;
}
