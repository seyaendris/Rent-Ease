"use client"

import useCountries from '@/app/hooks/useCountries'
import Select from 'react-select'
import Flag from 'react-world-flags'

export type CountrySelectValue = {
    flag: string
    label: string
    latlng: number[]
    region: string
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue
    onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const { getAll } = useCountries()

   
    return (
        <div>
            <Select 
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: CountrySelectValue) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div className='text-xl'>
                            <Flag code={option.value} alt={option.label} width="16" height="16" />
                        </div>
                        <div>
                            {option.label},
                            <span className='text-neutral-800 ml-1'>
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}

                classNames={{
                    control: () => 'p-2 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#bff2ea'
                    }
                })}
            />
        </div>
    )
}

export default CountrySelect
