const chai = require('chai');
const { expect } = chai;

function expectValidOdataResponse(response) {
    expect(response.status).to.equal(200);
    expect(response.headers["content-type"]).to.contain ("application/json");
    expect(response.headers["content-type"]).to.contain("charset=utf-8");
    expect(response.headers["odata-version"]).to.equal("4.0");
    expect(response.body["@odata.context"]).to.contain("/$metadata#Vacancies");
}

function expectValidVacancies(vacancies) {
    vacancies.forEach(vacancy => {
        expectValidVacancy(vacancy);
    });
}

function expectValidVacancy(vacancy) {
    expect(vacancy.UniqueId).to.have.lengthOf(42); // <UUID>-nl-nl
    expect(vacancy.Title.length).to.be.greaterThan(5); // Jurists
    expect(vacancy.MetaDescription.length).to.greaterThan(20);
    expect(vacancy.MinSalary).to.greaterThan(500);
    expect(vacancy.MinSalary).to.be.lessThan(9999);
    expect(vacancy.MaxSalary).to.greaterThanOrEqual(vacancy.MinSalary);
    expect(vacancy.MaxSalary).to.be.lessThan(9999);
    expect(vacancy.Salary).to.equal(`€ ${vacancy.MinSalary} tot € ${vacancy.MaxSalary}`);
    expect(vacancy.SalaryPeriod).to.equal("MONTH");
    expect(vacancy.YourProfile).to.match(/ervaring|niveau|werk/);
    expect(vacancy.WorkLocation.includes("Heerlen") || vacancy.WorkLocation.includes("Den Haag")).to.equal(true)
    expect(new Date(vacancy.PublicationDate).getFullYear()).to.be.greaterThanOrEqual(new Date().getFullYear() - 1);
}

module.exports = { expectValidOdataResponse, expectValidVacancies, expectValidVacancy }