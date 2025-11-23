import json

vacancies = []
with open("hh_ru_vacancies.jsonlines", "r", encoding="utf-8") as file:
    for line in file:
        vacancies.append(json.loads(line.strip()))

prepare = {}

for data in vacancies:
    vacancy_nm = data.get("vacancy_nm")
    key_skills = data.get("key_skills")
    profession_id = data.get("profession_id")

    if profession_id:
        if profession_id not in prepare:
            prepare[profession_id] = [set(), set()]
        prepare[profession_id][0].add(vacancy_nm)
        prepare[profession_id][1].update(set(key_skills))

out = {"roles": {}, "skills": {}}

for key in prepare:
    out["skills"][key] = list(prepare[key][1])

    for vacancy_nm in prepare[key][0]:
        out["roles"][vacancy_nm] = key

with open("roles_with_skills.json", "w", encoding="utf-8") as json_file:
    json.dump(out, json_file, ensure_ascii=False, indent=4)
