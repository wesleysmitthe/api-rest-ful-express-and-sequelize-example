import supertest from "supertest";
import StatusCodes from "http-status-codes";
import { SuperTest, Test } from "supertest";

import app from "src/server/server";
import { UserDao } from "src/_dao/userDao";
import { userModel } from "src/_dao/_MER/userModel";
import { pErr } from "src/utils/functions";
import { paramMissingError } from "src/utils/constants";
import { IReqBody, IResponse } from "../support/types";



describe("Users Routes", () => {
    const userRoutePath = "/api/user";
    const { BAD_REQUEST, CREATED, OK } = StatusCodes;


    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${userRoutePath}"`, () => {

        it(`should return a JSON object with all the users and a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(UserDao.prototype, "getList").and.returnValue(Promise.resolve({ count: 0, data: [] }));

            // Call API
            agent.get(userRoutePath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);

                    const respUsers = res.body;

                    // expect(respUsers.count).toEqual(users);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = "Could not fetch users.";
            spyOn(UserDao.prototype, "getList").and.throwError(errMsg);

            // Call API
            agent.get(userRoutePath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });


    describe(`"POST:${userRoutePath}"`, () => {
        const callApi = (reqBody: IReqBody) => {
            return agent.post(userRoutePath).type("form").send(reqBody);
        };

        const userData = {
            username: "weslesmitthe1",
            password: "ws1"
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            // Setup Spy
            spyOn(UserDao.prototype, "create").and.returnValue(Promise.resolve());

            // Call API
            agent.post(userRoutePath).type("form").send(userData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
            // Call API
            callApi({})
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = "Could not add user.";
            spyOn(UserDao.prototype, "add").and.throwError(errMsg);
            // Call API
            callApi(userData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });

    describe(`"PUT:${userRoutePath}"`, () => {

        const callApi = (reqBody: IReqBody) => {
            return agent.put(userRoutePath).type("form").send(reqBody);
        };

        const userData = {
            user: new User("Gordan Freeman", "gordan.freeman@gmail.com"),
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(UserDao.prototype, "update").and.returnValue(Promise.resolve());
            // Call Api
            callApi(userData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${paramMissingError}" and a
            status code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
            // Call api
            callApi({})
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(paramMissingError);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const updateErrMsg = "Could not update user.";
            spyOn(UserDao.prototype, "update").and.throwError(updateErrMsg);
            // Call API
            callApi(userData)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(updateErrMsg);
                    done();
                });
        });
    });

    describe(`"DELETE:${userRoutePath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(userRoutePath.replace(":id", id.toString()));
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(UserDao.prototype, "delete").and.returnValue(Promise.resolve());
            // Call api
            callApi(5)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const deleteErrMsg = "Could not delete user.";
            spyOn(UserDao.prototype, "delete").and.throwError(deleteErrMsg);
            // Call Api
            callApi(1)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });
    });
});
