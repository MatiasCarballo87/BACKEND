import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
    console.log(error.cause);

    switch (error.code) {
        case EErrors.EMPTY_FIELDS_ERROR:
            res
            .status(403)
            .send({ status: "error", error: error.name, cause: error.cause });
        break;
        case EErrors.PRODUCT_ERROR:
            res
            .status(404)
            .send({ status: "error", error: error.name, cause: error.cause });
        break;
        case EErrors.CART_ERROR:
            res
            .status(400)
            .send({ status: "error", error: error.name, cause: error.cause });
        break;
        case EErrors.ID_ERROR:
            res
            .status(400)
            .json({ status: "error", error: error.name, cause: error.cause });
        break;
        default:
            res.status(500).send({ status: "error", error: "Unhandled server error" });
        break;
    }
};