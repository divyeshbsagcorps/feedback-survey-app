import { useFormik } from "formik";
import * as Yup from "yup";
import { questions } from "./components/questions";
import { type FormValues } from "./types/types";

function App() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      feedback: "",
      satisfaction:"",
      recommend:"",
      department:"",
      source:"",
      likedfeatures:[],
      platforms:[],
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required").min(3,"Minimum 3 characters").max(50,"Maximum 50 characters"),

      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      feedback: Yup.string()
        .min(10, "Feedback must be at least 10 characters").max(500,"Feedback is too long")
        .required("Feedback is required"),

      satisfaction: Yup.string()
        .required("Please select a satisfaction level"),

      recommend: Yup.string().required("Please select an option"),

      department: Yup.string().required("Please select a department"),

      source: Yup.string().required("Please select a source"),

      likedfeatures: Yup.array().required("Please select at least one feature"),

      platforms: Yup.array().required("Please select at least one platform"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/*<div>
        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.name && formik.errors.name && (
          <p>{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label>Email</label>

        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label>Feedback</label>

        <textarea
          name="feedback"
          value={formik.values.feedback}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.feedback && formik.errors.feedback && (
          <p>{formik.errors.feedback}</p>
        )}
      </div>

      <div>
        <label>
          How satisfied are you with our service?
        </label>

        <div>
          <label>Excellent</label>

          <input type="radio"
          name="satisfaction"
          value="excellent"
          checked={formik.values.satisfaction === "excellent"}
          onChange={formik.handleChange}/>

          <label>Good</label>

          <input type="radio"
          name="satisfaction"
          value="good"
          checked={formik.values.satisfaction === "good"}
          onChange={formik.handleChange}/>

          <label>Average</label>

          <input type="radio"
          name="satisfaction"
          value="average"
          checked={formik.values.satisfaction === "average"}
          onChange={formik.handleChange}/>

          <label>Poor</label>
          
          <input type="radio"
          name="satisfaction"
          value="poor"
          checked={formik.values.satisfaction === "poor"}
          onChange={formik.handleChange}/>

          {formik.touched.satisfaction && formik.errors.satisfaction && (
            <p>{formik.errors.satisfaction}</p>
          )}
        </div>
      </div>

      <div>
        <label>Would You Recommend us to your friend ?</label>

        <div>
          <label>Yes</label>

          <input 
          type="radio"
          name="recommend"
          value="yes"
          checked={formik.values.recommend ==="yes"}
          onChange={formik.handleChange}/>


          <label>No</label>

          <input 
          type="radio"
          name="recommend"
          value="no"
          checked={formik.values.recommend ==="no"}
          onChange={formik.handleChange}/>

          {formik.touched.recommend && formik.errors.recommend && (
            <p>{formik.errors.recommend}</p>
          )}
          
        </div>
      </div>

      <div>
        <label>Department</label>
        <select 
        name="department"
        value={formik.values.department}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        >
        <option value="">Select a department</option>
        <option value="hr">HR</option>
        <option value="engineering">Engineering</option>
        <option value="marketing">Marketing</option>
        <option value="finance">Finance</option>
        </select>
        {formik.touched.department && formik.errors.department && (
          <p>{formik.errors.department}</p>
        )}
      </div>

      <div>

        <label>How did you hear about us?</label>
        <select 
        name="source"
        value={formik.values.source}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}>
          <option value="">Select an option</option>
          <option value="social-media">Social Media</option>
          <option value="friends">Friends</option>
          <option value="colleagues">Colleagues</option>
          <option value="online-advertisement">Online Advertisement</option>
          <option value="other">Other</option>
        </select>
        {formik.touched.source && formik.errors.source && (
          <p>{formik.errors.source}</p>
        )}
      </div>

      <div>
        <label>Which features do you like the most? (Select all that apply)</label>
        <div>
          <label>
          <input 
          type="checkbox"
          name="likedfeatures"
          value="ui-design"
          onChange={formik.handleChange}/>
          UI Design
          </label>

          <label>
          <input 
          type="checkbox"
          name="likedfeatures"
          value="response-time"
          onChange={formik.handleChange}/>
          Response Time
          </label>

          <label>
          <input 
          type="checkbox"
          name="likedfeatures"
          value="accuracy"
          onChange={formik.handleChange}/>
          Accuracy
          </label>

          <label>
          <input 
          type="checkbox"
          name="likedfeatures"
          value="customer-support"
          onChange={formik.handleChange}/>
          Customer Support
          </label>
        </div>
        {formik.touched.likedfeatures && typeof formik.errors.likedfeatures === "string" && (
          <p>{formik.errors.likedfeatures}</p>
        )}
      </div>

      <div>
        <label>Which platforms have you used our service on? (Select all that apply)</label>
        <div>
          <label>
          <input 
          type="checkbox"
          name="platforms"
          value="web"
          onChange={formik.handleChange}/>
          Web
          </label>

          <label>
          <input 
          type="checkbox"
          name="platforms"
          value="mobile"
          onChange={formik.handleChange}/>
          Mobile
          </label>

          <label>
          <input 
          type="checkbox"
          name="platforms"
          value="desktop"
          onChange={formik.handleChange}/>
          Desktop
          </label>
        </div>
        {formik.touched.platforms && typeof formik.errors.platforms === "string" && (
          <p>{formik.errors.platforms}</p>
        )}
      </div>*/}

      {questions.map((question)=>(
        <div key={question.id}>

        <label>{question.label}</label>

        {question.type === "text" && (
      <input type="text" name={question.id} 
      value={formik.values.name} 
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      />
    )}

    {question.type === "textarea" && (
      <textarea
      name={question.id}
      value={formik.values.feedback}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur} />
    )}

    {question.type === "radio" && (
      <div>
      {question.options?.map((option) => (
      <label key={option.value}>
        <input
          type="radio"
          name={question.id}
          value={option.value}
          checked={formik.values[question.id as keyof typeof formik.values] === option.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {option.label}
      </label>
    ))}
  </div>
  )}

    {question.type === "select" && (
      <select
      name={question.id}
      value={formik.values[question.id as keyof typeof formik.values]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}>
      {question.options?.map((option)=>(<option value={option.value}>{option.label}</option>))}
      </select>
    )}

    {question.type === "checkbox" && (
  <div>
    {question.options?.map((option) => (
      <label key={option.value}>
        <input
          type="checkbox"
          name={question.id}
          value={option.value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {option.label}
      </label>
    ))}
  </div>
)}
        </div>
      ))}

      

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;