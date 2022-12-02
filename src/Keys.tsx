import React, { useEffect, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [data, setData] = useState(props.initialData);
    const [changingID, setChangingID] = useState(Number);

    useEffect(() => {
        const data = JSON.parse(JSON.stringify(props.initialData));
        if (props.sorting === 'DESC') {
            setData(data.sort((a: IItem, b: IItem) => b.id - a.id));
        } else if (props.sorting === 'ASC') {
            setData(data.sort((a: IItem, b: IItem) => a.id - b.id));
        }
    }, [props.initialData, props.sorting]);

    function processChange(id: number, name: string) {
        setData(data.map((item) => (item.id === id ? { id, name } : item)));
    }

    function processKeyDown(e: React.KeyboardEvent, id: number, name: string) {
        if (e.key === 'Escape' || e.key === 'Enter') {
            setChangingID(NaN);
        }
        if (e.key === 'Enter') {
            processChange(id, name);
        }
    }

    return (
        <ol>
            {data.map((item: IItem) => {
                if (changingID === item.id)
                    return (
                        <input
                            autoFocus={true}
                            key={item.id}
                            defaultValue={item.name}
                            onKeyDown={(e) =>
                                processKeyDown(
                                    e,
                                    item.id,
                                    e.currentTarget.value,
                                )
                            }
                        ></input>
                    );
                else
                    return (
                        <li
                            key={item.id}
                            onClick={() => setChangingID(item.id)}
                        >
                            {item.name}
                        </li>
                    );
            })}
        </ol>
    );
}
