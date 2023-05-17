import { Attributes, Component, ComponentChild, ComponentChildren, h, JSX, Ref } from 'preact';
import { TickerApi, TickerType } from 'services/ticker';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';

export type DropdownOption = {
    name: string
    value: string
}

export type DropdownProps = {
    onChange: JSX.GenericEventHandler<HTMLSelectElement>
    options: Array<DropdownOption>
}

export const Dropdown = (props:DropdownProps) => {
    return (<select class={style.customSelect} onChange={props.onChange}>
        {props.options.map((val, index) => (
            <option key={index} value={val.value}>
                {val.name}
            </option>
        ))}
    </select>)
}

export type TickerDropdownState = {
    currentId: number
    currentTicker: TickerType
}

export const TickerDropdown = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [tickerMap, setTickerMap] = useState({})
    const [, setState] = useState({})

    useEffect(() => {
        if (isLoading) {
            TickerApi.getTickers().then(data => {
                setTickerMap(Object.fromEntries(data.map(entry => [entry.id.toString(), entry])))
                return setData(data);
            }).catch(error => console.log(error))
        }
    }, [isLoading])

    useEffect(() => {
        if (data.length != null) {
            setIsLoading(false)
        }
    }, [data])

    const getTickerById = (id) => {
        return tickerMap[id]
    }

    const onChange = (event) => {
        const id = event.target.value
        setState({currentId: id, currentTicker: getTickerById(id)})
    }

    return (
        <div>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <Dropdown options={data}
                onChange={onChange} />
            )}
        </div>
    )
}