import * as React from 'react';

export interface PostProps {
    id: number,
    title: string,
    link_name: string,
    content?: string,
}

export const PostComponent = ({id, title, link_name, content}: PostProps) => {
    return (
        <div>
            <div>
                <a href={link_name} target="_blank">{title}</a>
            </div>
        </div>
    )
};