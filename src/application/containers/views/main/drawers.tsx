import * as React from 'react'

export const AverageStayLength = () => {
    return (
        <div>
            <h2>Duree moyenne de sejour</h2>
            <h4>Requete SQL</h4>
            <pre>
            {`SELECT 
    AVG((e.resource#>>'{period, end}')::date - (e.resource#>>'{period, start}')::date) AS len
FROM encounter e
WHERE 
    e.resource#>>'{class, code}' = 'inpatient' OR e.resource#>>'{class, code}' = 'emergency';`}
            </pre>
            <h4>Resultats bruts</h4>
            <pre>
{`len
---------------------
 12.7630480167014614
(1 row)
`}
            </pre>
        </div>
    )
}

export const InAndOutPatients = () => {
    return (
        <div>
        <h2>Nombre d'entrée et de sortie par jour</h2>
        <h4>Requete SQL</h4>
        <pre>
        
{`SELECT 
    date_trunc('month', (e.resource#>>'{period, start}')::date) as date, 
    count(*) as entrees 
FROM encounter e 
WHERE 
    e.resource#>>'{class, code}' = 'inpatient' 
    OR e.resource#>>'{class, code}' = 'emergency' 
GROUP BY date 
ORDER BY date DESC 
LIMIT 10;

SELECT 
    date_trunc('month', (e.resource#>>'{period, end}')::date) as date, 
    count(*) as sorties 
FROM encounter e 
WHERE 
    e.resource#>>'{class, code}' = 'inpatient' 
    OR e.resource#>>'{class, code}' = 'emergency' 
GROUP BY date 
ORDER BY date DESC 
LIMIT 10;`}
        </pre>
        <h4>Resultats bruts</h4>
        <pre>
{`          date          | entrees
------------------------+---------
 2018-08-01 00:00:00+02 |       4
 2018-07-01 00:00:00+02 |       9
 2018-06-01 00:00:00+02 |       4
 2018-05-01 00:00:00+02 |       8
 2018-04-01 00:00:00+02 |       6
 2018-03-01 00:00:00+01 |       5
 2018-02-01 00:00:00+01 |       3
 2018-01-01 00:00:00+01 |       8
 2017-12-01 00:00:00+01 |       6
 2017-11-01 00:00:00+01 |       2
(10 rows)

date          | sorties
------------------------+---------
 2018-08-01 00:00:00+02 |       4
 2018-07-01 00:00:00+02 |       9
 2018-06-01 00:00:00+02 |       5
 2018-05-01 00:00:00+02 |       7
 2018-04-01 00:00:00+02 |       6
 2018-03-01 00:00:00+01 |       5
 2018-02-01 00:00:00+01 |       3
 2018-01-01 00:00:00+01 |       8
 2017-12-01 00:00:00+01 |       6
 2017-11-01 00:00:00+01 |       2
(10 rows)
`}
        </pre>
    </div>
    )
}

export const AvailableBeds = () => {
    return (
    <div>
        <h2>Lits disponibles par specialites</h2>
        <h4>Requete SQL</h4>
        <pre>
        {
`SELECT 
    l.resource#>>'{operationalStatus, display}' AS bedStatus,
    ll.resource#>>'{name}' AS service
    count(*) 
FROM location l 
JOIN location ll ON l.resource#>>'{partOf, identifier} = ll.resource#>>'{identifier}'
WHERE 
    l.resource#>>'{status, code}' = 'active'
    AND l.resource#>>'{physicalType, code}' = 'bd' 
    AND ll.ressource#>>'{physicalType, code}' = 'wd',
GROUP BY bedStatus, service;`}
        </pre>
        <h4>Pas d'exemple de resultat dans la base de donnee</h4>
    </div>
    )
}

export const ERStayDuration = () => {
    return (
    <div>
        <h2>Temps d'attente aux urgences</h2>
        <h3>Façon <span className='italic'>EpisodOfCare</span></h3>
        <h4>Requete SQL</h4>
        <pre>
{
`SELECT 
    AVG(now() - (e.resource#>>'{period, start}')::date) AS len 
FROM EpisodOfCare e 
WHERE 
    e.resource#>>'{status, code}' = 'onhold' 
    OR e.resource#>>'{status, code}' = 'waitlist'
`}
</pre>
        
        <h3>Façon <span className='italic'>Encounter</span></h3>
        <h4>Requete SQL</h4>
        <pre>{
`SELECT 
    AVG(now() - (e.resource#>>'{period, start}')::date) AS len 
FROM Encounter e 
WHERE 
    e.resource#>>'{class, code}' = 'PRENC' 
`}</pre>
    </div>
    )
}