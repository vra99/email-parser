import request from "supertest";
import app from "../src/app";

describe("test whether email and date api works", () => {
    test( "POST /send", (done) => {
        request(app)
            .post("/")
            .type("form")
            .send({ 
                email: "vialra99gmail.com",
                date: [ 
                    "2018-01-09",
                    "2018-01-10",
                    "2018-01-11"
                ]
            })
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                res.body.email == "vialra99@gmail.com";
                res.body.mean !== "undefined";
            })
            .end((err) => {
                if (err) return done(err);
                return done();
            });
    });
});
