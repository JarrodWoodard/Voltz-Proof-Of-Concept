import Joi from "joi";

export const allowNullables = () => {
  const _boolean = Joi.boolean;
  const _number = Joi.number;
  const _string = Joi.string;
  const _date = Joi.date;
  const _object = Joi.object;
  const _array = Joi.array;

  Joi.boolean = function (this: Joi.Root) {
    return _boolean.bind(this)().allow(null);
  };
  Joi.number = function (this: Joi.Root) {
    return _number.bind(this)().allow(null);
  };
  Joi.string = function (this: Joi.Root) {
    return _string.bind(this)().allow(null);
  };
  Joi.date = function (this: Joi.Root) {
    return _date.bind(this)().allow(null);
  };
  Joi.object = function (this: Joi.Root) {
    return _object.bind(this)().allow(null);
  };
  Joi.array = function (this: Joi.Root) {
    return _array.bind(this)().allow(null);
  };
};
