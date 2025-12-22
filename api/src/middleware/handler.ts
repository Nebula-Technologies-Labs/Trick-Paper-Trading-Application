import winston from "winston";

interface handlerParams {
  message: string;
}

const errorHandler = ({ message }: handlerParams) => {
  winston.error(message);
};

const infoHandler = ({ message }: handlerParams) => {
  winston.info(message);
};

const warnHandler = ({ message }: handlerParams) => {
  winston.warn(message);
};

export { errorHandler, infoHandler, warnHandler };
