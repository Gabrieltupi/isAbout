import styles from './Select.module.css'

function Select({text, name,options,handleOnChange, value}){
    const textParts = text.split('isAbout'); 

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>
                {textParts[0]} 
                <span className={styles.specialText}>isAbout</span>
                {textParts[1]} 
            </label>
            <select name={name} id={name} onChange={handleOnChange} value={value}>
                <option>Selecione uma opção</option>
                {options.map((option)=>(
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}
export default Select