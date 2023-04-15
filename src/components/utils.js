import axios from "axios";

export const fetchPatientEncounters = async (hid, config, setEncounters) => {
  try {
    const response = await axios.get(`/v2/patients/${hid}/encounters`, config);
    const entries = [];
    const encounterEntries = [];
    response.data.entries.forEach((entry, idx) => {
      entries.push(JSON.parse(entry.content));
    });
    entries.forEach((entry) => {
      const data = [
        {
          key: "ভিজিটের স্থান",
          value: entry?.createdFrom || "",
        },
        {
          key: "ওজন (kg)",
          value: entry?.weight || "",
        },
        {
          key: "বি এম আই (kg/m²)",
          value: entry?.bmi || "",
        },
        {
          key: "তাপমাত্রা (°C)",
          value: entry?.body_temperature || "",
        },
        {
          key: "নাড়ির স্পন্দন",
          value: entry?.pulse_rate || "",
        },
        {
          key: "জরায়ুর উচ্চতা (cm)",
          value: entry?.uterus_length || "",
        },
        {
          key: "সিস্টোলিক রক্ত চাপ (mmHg)",
          value: entry?.blood_pressure_systolic || "",
        },
        {
          key: "ডায়াস্টোলিক রক্ত চাপ (mmHg)",
          value: entry?.blood_pressure_diastolic || "",
        },
        {
          key: "ইডিমা",
          value: entry?.hasEdima ? "আছে" : "নেই" || "",
        },
        {
          key: "টিটি টিকা ডোজ সম্পূর্ণ করা",
          value: entry?.isTTDoseCompleted ? "আছে" : "নেই" || "",
        },
        {
          key: "প্রস্রাব পরীক্ষায় অ্যালবুমিন",
          value: entry?.hasAlbumin ? "আছে" : "নেই" || "",
        },
        {
          key: "প্রস্রাব পরীক্ষায় বিলিরুবিন",
          value: entry?.hasBilirubin ? "আছে" : "নেই" || "",
        },
        {
          key: "গতমাসে আয়রন বড়ির খাওয়ার সংখ্যা",
          value: entry?.numberOrIronTablet || "",
        },
        {
          key: "গতমাসে ক্যালসিয়াম বড়ির খাওয়ার সংখ্যা",
          value: entry?.numberOfCalciumTablet || "",
        },
        {
          key: "অন্যান্য জটিলতা",
          value: entry?.other_complication || "",
        },
      ];
      encounterEntries.push(data);
    });
    setEncounters(encounterEntries);
  } catch (error) {}
};

export const fetchPatientDetails = async (
  hid,
  config,
  setProfile,
  setPatientDetails
) => {
  try {
    const response = await axios.get(`/api/v1/patients/${hid}`, config);
    const details = response.data;
    const data = [
      {
        key: "নামের প্রথম অংশ",
        value: details?.given_name || "",
      },
      {
        key: "নামের শেষ অংশ",
        value: details?.sur_name || "",
      },
      {
        key: "ফোন নম্বর",
        value: details?.phone_number.number || "",
      },
      {
        key: "জাতীয় পরিচয়পত্র নম্বর",
        value: details?.nid || "",
      },
      {
        key: "হেলথ আইডি",
        value: details?.hid || "",
      },
      {
        key: "লিঙ্গ",
        value:
          details?.gender === "F"
            ? "মহিলা"
            : details?.gender === "M"
            ? "পুরুষ"
            : "অন্যান্য",
      },
      {
        key: "জন্ম তারিখ",
        value: details?.date_of_birth
          ? details?.date_of_birth.slice(0, 10)
          : "",
      },
      {
        key: "ঠিকানা",
        value: details?.present_address?.address_line || "",
      },
      {
        key: "গোপনীয়তা",
        value: details?.confidential || "",
      },
    ];
    setProfile(data);
    setPatientDetails(response.data);
    sessionStorage.setItem("patientName", response.data.given_name);
  } catch (error) {}
};
