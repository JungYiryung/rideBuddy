import { idRegx, pwRegx, nameRegx, mailRegx, codeRegx } from "#utility/regx.js";
import wrap from "#utility/wrapper.js";

export const validateRegx = wrap(async (req, res, next) => {
  const regx = {
    id: idRegx,
    pw: pwRegx,
    name: nameRegx,
    mail: mailRegx,
    code: codeRegx,
  };

  const bodyArray = Object.entries(req.body);
  // mailtoken 제외
  const withoutToken = bodyArray.filter((element) => {
    return element[0] !== "mail_token";
  });
  // 돌아가면서 key에 따라 regx Match
  withoutToken.forEach((elem) => {
    const key = elem[0];
    if (regx[key]) {
      const result = regx[key].test(elem[1]);
      console.log(result);
      if (!result) {
        return next(new Error("정규표현식 에러"));
      }
    } else {
      return next(new Error("유효하지 않은 정규표현식 key값"));
    }
  });
  next();
});
