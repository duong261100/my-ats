import Candidate from '../src/models/Candidate.js'
import CandidatesApplyJobs from '../src/models/CandidatesApplyJobs.js'
import CandidatesHasSkills from '../src/models/CandidatesHasSkills.js'
import { faker } from '@faker-js/faker'

const numberOfCandidates = 100

const seedCandidates = async () => {
  await Candidate.create({
    email: 'user@gmail.com',
    password: '123456',
    fullname: faker.name.fullName(),
    cv_url: faker.image.imageUrl(),
    avatar_url: faker.image.imageUrl(),
    address: `${faker.address.streetAddress()} , ${faker.address.city()}`,
    phone_number: faker.phone.number(),
    birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    summary: faker.lorem.paragraphs(2, '<br/>\n'),
    hobby: faker.lorem.paragraphs(1, '<br/>\n'),
  })

  for (let i = 0; i < numberOfCandidates - 1; i++) {
    await Candidate.create({
      email: faker.internet.email(),
      password: '123456',
      fullname: faker.name.fullName(),
      cv_url: faker.image.imageUrl(),
      avatar_url: faker.image.imageUrl(),
      address: `${faker.address.streetAddress()} , ${faker.address.city()}`,
      phone_number: faker.phone.number(),
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      summary: faker.lorem.paragraphs(2, '<br/>\n'),
      hobby: faker.lorem.paragraphs(1, '<br/>\n'),
    })
  }
}

const seedCandidatesApplyJobs = async () => {
  for (let i = 1; i < numberOfCandidates / 4; i++) {
    await CandidatesApplyJobs.create({
      candidate_id: i,
      job_id: [1, 5, 11][Math.floor(Math.random() * 3)],
      step_id: [1, 2, 3, 5, 7, 8, 9][Math.floor(Math.random() * 7)],
      point: faker.datatype.number({ min: 1, max: 100 }),
      note: faker.lorem.paragraphs(1),
    })
  }
  for (let i = numberOfCandidates / 4; i < numberOfCandidates / 2; i++) {
    await CandidatesApplyJobs.create({
      candidate_id: i,
      job_id: [2, 6, 9][Math.floor(Math.random() * 3)],
      step_id: [1, 2, 4, 6, 7, 8, 9][Math.floor(Math.random() * 7)],
      point: faker.datatype.number({ min: 1, max: 100 }),
      note: faker.lorem.paragraphs(1),
    })
  }
  for (let i = numberOfCandidates / 2; i < (numberOfCandidates * 3) / 4; i++) {
    await CandidatesApplyJobs.create({
      candidate_id: i,
      job_id: [3, 7, 8][Math.floor(Math.random() * 3)],
      step_id: [1, 2, 5, 7, 8, 9][Math.floor(Math.random() * 6)],
      point: faker.datatype.number({ min: 1, max: 100 }),
      note: faker.lorem.paragraphs(1),
    })
  }
  for (let i = (numberOfCandidates * 3) / 4; i < numberOfCandidates; i++) {
    await CandidatesApplyJobs.create({
      candidate_id: i,
      job_id: [4, 10][Math.floor(Math.random() * 2)],
      step_id: [1, 2, 3, 7, 8, 9][Math.floor(Math.random() * 6)],
      point: faker.datatype.number({ min: 1, max: 100 }),
      note: faker.lorem.paragraphs(1),
    })
  }
}

const seedCandidatesHasSkills = async () => {
  for (let i = 1; i < numberOfCandidates; i++) {
    const skills = Array.from({ length: 38 }, (_, i) => i + 1)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
    for (let j = 1; j < skills.length; j++) {
      await CandidatesHasSkills.create({
        candidate_id: i,
        skill_id: skills[j],
      })
    }
  }
}

await seedCandidates()
await seedCandidatesApplyJobs()
await seedCandidatesHasSkills()
